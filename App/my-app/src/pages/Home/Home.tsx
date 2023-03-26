import React, { useState } from 'react';
import { FC, useEffect } from 'react';
import CardSong from './../../componets/CardSong/CardSong';
import "./Home.css"
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { GetTopTracks } from './../../redux/Song/CreateSong';
import Song from '../../componets/Song/Song';
import { GetRecommendPlaylist } from './../../redux/Playlist/CreatePlaylist';
import { GetTrackinLibrary } from '../../redux/Library/CreateLibrary';
import CardSongLoading from '../../componets/CardSongLoading/CardSongLoading';

const Home: FC = () => {
   const { top_tracks }: any = useAppSelector(state => state.song)
   const { user }: any = useAppSelector(state => state.user)
   const { reccomend_playlists, new_tracks }: any = useAppSelector(state => state.playlist)

   const [recommend, setRecommend] = useState<any[]>([]);
   const [topTracks, setTopTracks] = useState<any[]>([]);
   const [new_track_arr, setNew_track_arr] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const dispatch = useAppDispatch();

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         await Promise.all([
            dispatch(GetRecommendPlaylist()),
            dispatch(GetTopTracks()),
            user && dispatch(GetTrackinLibrary(user?.user_id))
         ]);
         setIsLoading(false);
      };
      fetchData();
   }, [])

   useEffect(() => {
      if (user) {
         dispatch(GetTrackinLibrary(user?.user_id))
      }
   }, [user])

   useEffect(() => {
      setRecommend(reccomend_playlists)
   },
      [reccomend_playlists])

   useEffect(() => {
      setTopTracks(top_tracks)
   },
      [top_tracks])

   useEffect(() => {
      setNew_track_arr(new_tracks)
      console.log(new_tracks)
   }, [new_tracks])
   if (isLoading) {
      return <div className='load'><CardSongLoading />
         <CardSongLoading />
      </div>
   }
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="center">
               <div className="homes">
                  {Array?.isArray(recommend) &&
                     recommend?.map((item: any, index: number) => {
                        return (<div className="blocks_reccomemd">
                           <div className="recoomecd_text">
                              <h1 className="title">
                                 {item?.title}
                              </h1>
                              <Link to={`/user/playlist/${item?.playlist_id}`}>Show all</Link>
                           </div>

                           <div className="blocks_card">
                              {
                                 item?.tracks?.slice(0, 5).map((el: any, index: number) => {
                                    return (
                                       <CardSong item={el} key={index} songs_array={item?.tracks} />
                                    )
                                 })
                              }
                           </div>
                        </div>)
                     })
                  }
                  <div className="top_tracks">
                     <h1 className="title">Top tracks</h1>
                     {Array?.isArray(topTracks) &&
                        topTracks?.map((el: any, index: number) => {
                           return (
                              <div className='raiting'>
                                 <p className='space'>{index + 1}</p>
                                 <Song item={el} key={index} songs_array={topTracks} />
                                 <p className='rate'>{Number(el?.avg_rating)?.toFixed(2)}</p>
                              </div>
                           )
                        })
                     }
                  </div>
                  <div className="top_tracks">
                     <h1 className="title">New tracks</h1>
                     {
                        <div className="blocks_reccomemd">
                           <div className="blocks_card">
                              {
                                 new_track_arr?.slice(0, 5).map((el: any, index: number) => {
                                    return (
                                       <div className='raiting'>
                                          <CardSong item={el} key={index} songs_array={new_track_arr} />
                                       </div>
                                    )
                                 })
                              }
                           </div>
                        </div>
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
