import React from 'react';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import "./Song.css"
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Modal from './../Modal/Modal';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
interface ISong {
   isAdd?: boolean,
}
const Song: FC<ISong> = ({ isAdd }) => {
   const { isAuth }: any = useAppSelector(state => state.user);
   const [menu, setMenu] = useState<boolean>(false);
   const [liked, setLiked] = useState<boolean>(false);
   const [add, setAdd] = useState<boolean>(true);
   const [modal, setModal] = useState<boolean>(false);
   const [plus, setPlus] = useState<boolean>(false);
   const [genre, setGenre] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [isPlay, setPlay] = useState<boolean>(false)
   const songRef = useRef<HTMLDivElement>(null);
   const downNavRef = useRef<HTMLDivElement>(null);
   const dotRef = useRef<HTMLImageElement>(null);

   const dispatch = useAppDispatch();
   const handleLikeClick = () => {
      setLiked(!liked);
   };

   const handleDotClick = () => {
      setMenu(!menu);
      setAdd(true)
   };
   const ChangeModal = (state: boolean) => {
      setModal(state)
   }

   const handleClick = (event: any) => {
      if (
         songRef.current &&
         !songRef.current.contains(event.target) &&
         downNavRef.current &&
         !downNavRef.current.contains(event.target) &&
         dotRef.current &&
         !dotRef.current.contains(event.target)
      ) {
         setMenu(false);
         setAdd(true)
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
         document.removeEventListener("click", handleClick);
      };
   }, []);
   const PlayMusic = () => {
      if (isAuth) {
         dispatch(ShowModal())
         return
      }
      setPlay(!isPlay)
   }
   return (
      <div ref={songRef} className="song">

         <img className="play" src={!isPlay ? process.env.PUBLIC_URL + "/icons/play.svg" : process.env.PUBLIC_URL + "/icons/stop_song.svg"} onClick={() => PlayMusic()} />
         <div className="description">
            <Link
               to={"/user/executor/:executor_id"}
               className="name_author outside"
            >
               INSTASAMLff
            </Link>
            <Link
               to={"/user/track/:track_id"}
               className="name_song outside"
            >
               INSTASAMLA
            </Link>
         </div>
         {
            !isAdd ? (
               <div className="action">

                  <img
                     src={
                        !liked
                           ? process.env.PUBLIC_URL + "/icons/heart.svg"
                           : "/icons/full.svg"
                     }
                     alt="like"
                     onClick={handleLikeClick}
                  />
                  <img
                     ref={dotRef}
                     className="dot"
                     src={process.env.PUBLIC_URL + "/icons/dot.svg"}
                     alt="menu"
                     onClick={handleDotClick}
                  />
                  {menu && (
                     <div ref={downNavRef} className="menu">
                        <div className="btn" onClick={() => setAdd(!add)}>Add in playlist
                           {
                              !add && (<div className="add_list">
                                 <ul>
                                    <li>
                                       a
                                    </li>
                                    <li>
                                       dfsa
                                    </li>
                                 </ul>
                              </div>)
                           }
                        </div>
                        <div className="btn"
                           onClick={() => ChangeModal(true)}
                        >Edit</div>
                        <div className="btn">Delete</div>
                     </div>
                  )}
               </div>
            )
               : (
                  <div className="action">
                     <p className='plus' onClick={() => setPlus(!plus)} >
                        {plus ? "-" : "+"}
                     </p>
                  </div>
               )
         }
         {
            modal && (
               <Modal ChangeModal={ChangeModal}>
                  <div className="modal_content_change">
                     <h1 className="title">
                        Change song
                     </h1>
                     <div className="blocks">
                        <div className="block">
                           <h2 className="enter_value">
                              Name
                           </h2>
                           <input
                              type="text"
                              value={name}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                              placeholder='Andrey...' />
                        </div>
                        <div className="block">
                           <h2 className="enter_value">
                              Genre
                           </h2>
                           <select value={genre}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)}>
                              <option value="test">Rock</option>
                           </select>
                        </div>
                        <div className="block">
                           <h2 className="enter_value">
                              Image
                           </h2>
                           <button className='image'>Image</button>
                        </div>
                        <div className="save">
                           Save
                        </div>
                     </div>
                  </div>
               </Modal>
            )
         }
      </div>
   );
};


export default Song;
