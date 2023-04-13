import React from 'react';
import { FC } from 'react';
import "./CardSong.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
import { useState } from 'react';
import { PlayMusic, PlayPause } from '../../redux/Song/CreateSong';
import ImageLoading from './../ImageLoading/ImageLoading';
interface ICardSong {
   item: any;
   songs_array?: any,
}

const CardSong: FC<ICardSong> = ({ item, songs_array }) => {
   const { isAuth }: any = useAppSelector(state => state.user);
   const { isTrack, track_id, isPlay }: any = useAppSelector(state => state.song);



   const dispatch = useAppDispatch();

   function handlePlayClick(event: any) {
      event.preventDefault();
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }

      dispatch(PlayMusic())
   }



   const pauseSong = () => {
      dispatch(PlayPause());
   };

   const playSong = (item: any) => {
      const data = {
         track: item,
         songs_array: songs_array
      }
      dispatch(PlayMusic(data))

   };
   return (
      <Link to={`/user/track/:${item?.track_id}`}>
         <div className='card_song' key={item?.id_track}>
            {/* <img src={item?.track_image} /> */}
            <ImageLoading img={item?.track_image} />
            <div className="text_block">
               <p className="title_song">
                  {item?.track_title}
               </p>
               <p className="artist_song">

                  {item?.users?.map((el: any, index: number) => {
                     return (
                        <>
                           <Link to={`/user/executor/:${el?.user_id}`}>{el.user_name}</Link>
                           <span style={{ color: "gray" }}>
                              {index === item.users?.length - 1 ? "" : ", "}
                           </span>
                        </>
                     );
                  })}
               </p>
            </div>
            <div className={(track_id === item?.track_id && isPlay) ? "music_player how" : "music_player"}
               onClick={(e) => {
                  e.preventDefault()
                  track_id === item?.track_id
                     ? isPlay
                        ? pauseSong()
                        : playSong(item)
                     : playSong(item)

               }

               }>
               <img

                  src={
                     !isPlay || track_id !== item?.track_id
                        ? process.env.PUBLIC_URL + "/icons/Player.svg"
                        : process.env.PUBLIC_URL + "/icons/stop1.svg"
                  }

               />
            </div>
         </div>
      </Link>
   );
}

export default CardSong;
