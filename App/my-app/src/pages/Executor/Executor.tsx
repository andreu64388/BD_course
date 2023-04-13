import React from 'react';
import { FC, useEffect } from 'react';
import Song from './../../componets/Song/Song';
import "./Executor.css"
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getArtist } from './../../redux/Song/CreateSong';



const Executor: FC = () => {
   const { artist, user_tracks, index }: any = useAppSelector(state => state.song)
   const { executor_id } = useParams();

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getArtist(executor_id?.slice(1)));
   }, [executor_id])

   return (
      <div className='wrapper'>
         <div className="executor">
            <h1 className="title">
               {artist?.user_name}
            </h1>
            <div className="about_track" style={{ backgroundImage: `url(${artist?.user_img})` }}>
            </div>
            <div className="wrapper_all">
               <div className="players">
                  <div className="music_player">
                     <img src={process.env.PUBLIC_URL + "/icons/Player.svg"} alt="" />
                  </div>
               </div>
               <div className="musics">
                  {user_tracks?.map((item: any, ind: number) => (
                     <Song
                        
                        item={item}
                     
                        songs_array={user_tracks}
                        key={item?.track_id}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div >
   );
}

export default Executor;
