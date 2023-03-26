import React from 'react';
import { FC, ChangeEvent } from 'react';
import "./Search.css"
import { SearchTracksAndPlaylist } from './../../redux/Song/CreateSong';
import { useState } from 'react';
import Song from './../../componets/Song/Song'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { useEffect } from 'react';
import Loading from './../../componets/Loading/Loading';
import { useRef } from 'react';
import { GetRecommendPlaylist } from './../../redux/Playlist/CreatePlaylist';



const Search: FC = () => {

   const { search_tracks, search_playlists, }: any = useAppSelector(state => state.song)
   const { reccomend_playlists }: any = useAppSelector(state => state.playlist)


   const [value, setValue] = useState<string>("");
   const [loading, setLoading] = useState(false);
   const [tracks, setTracks] = useState([]);
   const [playlists, setPlaylists] = useState([]);
   const [recommend, setRecommend] = useState<any[]>([]);

   const dispatch = useAppDispatch();
   const timerRef = useRef<number | null>(null);

   useEffect(() => {
      dispatch(GetRecommendPlaylist())
   }, [])

   useEffect(() => {
      setRecommend(reccomend_playlists)
   },
      [reccomend_playlists])

   useEffect(() => {
      timerRef.current = window.setTimeout(() => {
         if (value) {
            dispatch(SearchTracksAndPlaylist(value));
            setLoading(true);
         } else {
            setLoading(false);
         }
      }, 500);

      return () => {
         if (timerRef.current) {
            clearTimeout(timerRef.current);
         }
      }
   }, [value, dispatch]);

   useEffect(() => {
      setTracks(search_tracks);
      setPlaylists(search_playlists);
      setLoading(false);
   }, [search_tracks, search_playlists]);

   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="search">
               <div className="input_search">
                  <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                  <input value={value}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                  <img className='clear'
                     src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                     alt="clear" onClick={() => setValue("")} />
               </div>
               <div className="response">
                  {
                     value.trim().length == 0
                     && (<div className="ifnotsearch">
                        {recommend?.map((item: any, index: any) => {
                           return (
                              <Link to={`/user/playlist/${item?.playlist_id}`} key={index}>
                                 <div className="block_event">
                                    <h1 className="title">
                                       {item?.title}
                                    </h1>
                                 </div>
                              </Link>)
                        })}
                     </div>)
                  }
                  <div className="response_with_playlist_and_songs">
                     {loading ?
                        <div className='loading'>
                           <Loading />
                        </div>
                        :
                        (<>
                           {value.trim().length > 0 && (

                              <>     <div className="songs">
                                 <h1 className="title">
                                    Songs
                                 </h1>
                                 <div className="songs_blocks">
                                    {tracks?.map((item: any, index: number) => {
                                       return (
                                          <Song item={item} />
                                       );
                                    })}
                                 </div>
                              </div>
                                 <div className="playlist">
                                    <h1 className="title">
                                       Playlist
                                    </h1>

                                    <div className="ifnotsearch">
                                       {playlists?.map((el: any, index: any) => {
                                          return (
                                             <Link to={`/user/playlist/${el.playlist_id}`} key={index}>
                                                <div className="block_event" style={{ backgroundColor: "red" }}>
                                                   <h1 className="title">
                                                      {el.title}
                                                   </h1>
                                                </div>
                                             </Link>
                                          );
                                       })}
                                    </div>
                                 </div></>
                           )}

                        </>)}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Search;
