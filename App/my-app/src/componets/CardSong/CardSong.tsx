import React from 'react';
import { FC } from 'react';
import "./CardSong.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
import { useState } from 'react';
import { PlayMusic } from '../../redux/Song/CreateSong';
interface ICardSong {
   item: any;
}

const CardSong: FC<ICardSong> = ({ item }) => {
   const [isPlay, setPlay] = useState<boolean>(false)
   const dispatch = useAppDispatch();
   const { isAuth }: any = useAppSelector(state => state.user);
   const { isTrack }: any = useAppSelector(state => state.song);

   function handlePlayClick(event: any) {
      event.preventDefault();
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }
      setPlay(isTrack)
      dispatch(PlayMusic())
   }

   return (
      <Link to={`/user/track/:${item?.track_id}`}>
         <div className='card_song' key={item?.id_track}>
            <img src={item?.track_image} />
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
            <div className="music_player" onClick={handlePlayClick}>
               <img src={
                  !isPlay ? process.env.PUBLIC_URL + "/icons/Player.svg" :
                     process.env.PUBLIC_URL + "/icons/stop1.svg"
               } alt=""
               />
            </div>
         </div>
      </Link>
   );
}

export default CardSong;
