import React, { useState } from 'react';
import { FC, useEffect } from 'react';
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import "./Player.css"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SoundEffect from './../SoundEffect/SoundEffect';
import { ClosePlay, HideMusic, ShowMusic } from '../../redux/Song/CreateSong';
import { AddTrackInLibrary, DeleteTrackInLibrary } from './../../redux/Library/CreateLibrary';


interface IPlayer {
   ClosePlayer(el: boolean): any;
   player?: boolean;
}

const Player: FC<IPlayer> = () => {
   const { user }: any = useAppSelector(state => state.user);
   const { library }: any = useAppSelector(state => state.library)
   const { isShow, currentSong }: any = useAppSelector(state => state.song)

   const [liked, setLiked] = useState<boolean>(false);
   const [close, setClose] = useState<boolean>(false);

   useEffect(() => {
      if (library) {
         if (library?.find((obj: any) => Number(obj.track_id) === Number(currentSong?.track_id))) {
            setLiked(true)
         } else {
            setLiked(false)
         }
      }
   }, [library, liked])

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

   const AddLibrary = (e: any, song_id: string) => {
      e.preventDefault();
      const data = {
         song_id: song_id,
         user_id: user?.user_id
      }
      dispatch(AddTrackInLibrary(data))
   }

   const DeleteLibrary = (e: any, song_id: string) => {
      e.preventDefault();
      const data = {
         song_id: song_id,
         user_id: user?.user_id
      }
      dispatch(DeleteTrackInLibrary(data))
   }
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

            <Link to={`/user/track/:${currentSong?.track_id}`} className="track">
               <div className="img">
                  <img src={currentSong?.track_image} alt="" />
               </div>
               <div className="text">
                  <h1 className="name_track">
                     {currentSong?.track_title}
                  </h1>

               </div>
               {
                  !liked ? (
                     <img className='play' src={process.env.PUBLIC_URL + "/icons/heart.svg"}
                        onClick={(e) => AddLibrary(e, currentSong?.track_id)}
                     />) : (
                     <img className='play' src={process.env.PUBLIC_URL + "/icons/full.svg"}
                        onClick={(e) => DeleteLibrary(e, currentSong?.track_id)}

                     />
                  )
               }
            </Link>
            <div className="player_block">
               <MusicPlayer />
            </div>

         </div>
      </div>
   );
}

export default Player;
