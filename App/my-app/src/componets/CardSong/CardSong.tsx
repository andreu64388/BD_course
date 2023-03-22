import React from 'react';
import { FC } from 'react';
import "./CardSong.css"
import shortenText from './Functions';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
import { useState } from 'react';
import { PlayMusic } from '../../redux/Song/CreateSong';
interface ICardSong {
   item: any;
}
const test = [
   {
      id_track: "1",
      title: "Я отключаю телефон",
      img: "/icons/Instasamka.svg",
      artist: ["Insasamka", "Oleg"],
      link: ["d", "ds"],
      link_track: "/user/track/:track_id",

   }
]

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
                  <Link to={`/user/executor/:${item?.user_id   }`}>
                     <span style={{ color: "gray" }}>
                        {item.user_name}
                     </span>
                  </Link>
                  {/* {item?.artist?.map((el: any, index: number) => {
                     return (
                        <>
                           <Link to={`/user/executor/:${}`}>{el.artist}</Link>
                           <span style={{ color: "gray" }}>
                              {index === item.artist?.length - 1 ? "" : ", "}
                           </span>
                        </>
                     );
                  })} */}
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
