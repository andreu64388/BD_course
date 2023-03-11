import React from 'react';
import { FC, useState } from 'react';
import "./Track.css"
import Song from '../../componets/Song/Song';

import { useEffect } from 'react';
import getDominantColor from './../../assets/Functioons/getDominantColor';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';

const img = process.env.PUBLIC_URL + "/icons/in.svg"
const Track: FC = () => {
   const [backgroundColor, setBackgroundColor] = useState("");
   const [isPlay, setPlay] = useState<boolean>(false)


   const { isAuth }: any = useAppSelector(state => state.user);
   const dispatch = useAppDispatch();
   function handleImageLoad(event: any) {
      const image = event.target;
      const dominantColor = getDominantColor(image);
      setBackgroundColor(dominantColor);

   }
   const PlayMusic = () => {
      if (isAuth) {
         dispatch(ShowModal())
         return
      }
      setPlay(!isPlay)
   }
   return (
      <div className='wrapper'>
         <div className="track">
            <div className="about_track"
               style={{ background: `${backgroundColor}` }}>
               <div className="image">
                  <img src={process.env.PUBLIC_URL + "/icons/in.svg"} onLoad={handleImageLoad} alt="Instasamka.svg" />
               </div>
               <div className="text">
                  <h1 className="name_track">
                     Отключаю телефон
                  </h1>
                  <div className="full_info">
                     <a href="">
                        <img src={process.env.PUBLIC_URL + "/icons/in.svg"} alt="" />
                        <p>INSTASAMKA </p>
                     </a>
                     <div className="duraction">
                        2:32
                     </div>
                     <div className="date">
                        12.21.21
                     </div>
                     <div className="rating">
                        9.4
                     </div>
                  </div>
               </div>


            </div>
            <div className="wrapper_all">
               <div className="players">
                  <div className="music_player" onClick={() => PlayMusic()}>
                     <img src={
                        !isPlay ? process.env.PUBLIC_URL + "/icons/Player.svg" :
                           process.env.PUBLIC_URL + "/icons/stop1.svg"
                     } alt=""

                     />
                  </div>
               </div>

               <div className="musics">
                  <Song />
                  <Song />
                  <Song />
               </div>
            </div>
         </div>
      </div >
   );
}

export default Track;
