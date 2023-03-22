import React, { useState } from 'react';
import { FC, useEffect } from 'react';
import CardSong from './../../componets/CardSong/CardSong';
import "./Home.css"
import { Link } from 'react-router-dom';
import Tabulation from './../../componets/Tab/Tab';
import CardSongLoading from './../../componets/CardSongLoading/CardSongLoading';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { GetRecommend, GetTrackinLibrary } from '../../redux/Song/CreateSong';
import { GetTopTracks } from './../../redux/Song/CreateSong';
import Song from '../../componets/Song/Song';
const values = [
   {
      id: 1,
      name: "Home",
      author: ["Andter", "te"],
      img: "/icons/home.svg",
   },
   {
      id: 2,
      name: "Home",
      author: ["Andter", "te"],
      img: "/icons/home.svg",
   },

]
const item =
{
   id_track: "1",
   title: "Я отключаю телефон",
   img: "/icons/Instasamka.svg",
   artist: [
      {
         artist: "Test",
         link: "/user/executor/:executor_id"
      }
   ],
   link_track: "/user/track/:track_id",

}



const Home: FC = () => {
   const dispatch = useAppDispatch();
   const [recommend, setRecommend] = useState<any[]>([]);
   const [topTracks, setTopTracks] = useState<any[]>([]);
   const { user }: any = useAppSelector(state => state.user)
   const [new_track_arr, setNew_track_arr] = useState<any[]>([]);
   const { reccomend_playlists, top_tracks, new_tracks }: any = useAppSelector(state => state.song)
   useEffect(() => {
      dispatch(GetRecommend())
      dispatch(GetTopTracks())
      dispatch(GetTrackinLibrary(user?.user_id))
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
   }, [new_tracks])
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="center">
               <div className="homes">
                  {
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
                                       <CardSong item={el} key={index} />
                                    )
                                 })
                              }

                           </div>
                        </div>)
                     })
                  }
                  <div className="top_tracks">
                     <h1 className="title">Top tracks</h1>
                     {
                        topTracks?.map((el: any, index: number) => {
                           return (
                              <div className='raiting'>
                                 <p className='space'>{index + 1}</p>
                                 <Song item={el} key={index} />
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
                                          <CardSong item={el} key={index} />

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
