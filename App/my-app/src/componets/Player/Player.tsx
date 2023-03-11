import React, { useState } from 'react';
import { FC } from 'react';
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import "./Player.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SoundEffect from './../SoundEffect/SoundEffect';
import { ClosePlay, HideMusic, ShowMusic } from '../../redux/Song/CreateSong';

const tracks = [
   process.env.PUBLIC_URL + "/Markul_Tosya_CHajjkina_-_Strely_74640890.mp3",
   process.env.PUBLIC_URL + "/MORGENSHTERN_The_Limba_NILETTO_Boombl4_-_SKOLKO_STOIT_LYUBOV_74640896.mp3"

]
interface IPlayer {
   ClosePlayer(el: boolean): any;
   player?: boolean;
}
const Player: FC<IPlayer> = ({ ClosePlayer, player }) => {
   const { isShow }: any = useAppSelector(state => state.song)
   const [liked, setLiked] = useState<boolean>(false);
   const [close, setClose] = useState<boolean>(false);

   const dispatch = useAppDispatch();
   const Hide = () => {
      setClose(true)
      dispatch(HideMusic())
   }
   const Close = () => {
      dispatch(ClosePlay());
      setClose(false)
   }
   const Show = () => {
      dispatch(ShowMusic())
   }
   const handleLikeClick = (e: any) => {
      e.preventDefault();
      setLiked(!liked);
   };

   return (
      <div className={!isShow ? 'player hide' : 'player'
      }>
         <div className="contents">
            <SoundEffect />
            <div className="close" onClick={() => Close()}>
               <img
                  src={process.env.PUBLIC_URL + "/icons/close.svg"}
                  alt="polygon"
               />
            </div>
            {
               isShow ? (<div className="hide" onClick={() => Hide()}>
                  <img
                     src={process.env.PUBLIC_URL + "/icons/ArrowDown.svg"}
                     alt="polygon"
                  />
               </div>) : (close && <div className="show" onClick={() => Show()}>
                  <img
                     src={process.env.PUBLIC_URL + "/icons/ArrowUp.svg"}
                     alt="polygon"
                  />
               </div>)
            }

            <Link to={"/user/track/:track_id"} className="track">

               <div className="img">
                  <img src={process.env.PUBLIC_URL + "/icons/in.svg"} alt="" />
               </div>
               <div className="text">
                  <h1 className="name_track">
                     ifdsifdsi
                  </h1>
                  <Link to={"/user/executor/:executor_id"}>
                     Instasamka
                  </Link>
               </div>
               <img className="play"
                  src={
                     !liked
                        ? process.env.PUBLIC_URL + "/icons/heart.svg"
                        : "/icons/full.svg"
                  }
                  alt="like"
                  onClick={handleLikeClick}
               />
            </Link>
            <div className="player_block">
               <MusicPlayer tracks={tracks} />
            </div>

         </div>
      </div>
   );
}

export default Player;
