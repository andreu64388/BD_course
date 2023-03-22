import React, { useEffect } from "react";
import { FC, ChangeEvent } from "react";
import Song from "../../componets/Song/Song";
import "./PageAddTrack.css";
import { useState } from "react";
import Modal from "./../../componets/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AddTrack } from "../../redux/Song/CreateSong";
import { GetTrackinLibrary, GetSongs } from './../../redux/Song/CreateSong';
import Loading from './../../componets/Loading/Loading';
const PageAddTrack: FC = () => {

   const { user }: any = useAppSelector(state => state.user);
   const { genres, songs, index }: any = useAppSelector(state => state.song);
   const [modal, setModal] = useState<boolean>(false);
   const [name, setName] = useState<string>("");
   const [genre, setGenre] = useState<string>("");
   const [image, setImage] = useState<string | any>("");
   const [genres_arr, setGenres_arr] = useState<any[]>([]);
   const [audio, setAudio] = useState<string | any>("");
   const [songs_array, setSongs_array] = useState<any[]>([]);
   const [loading, setLoading] = useState(false);
   const dispatch = useAppDispatch();

   useEffect(() => {
      setLoading(true);
      dispatch(GetSongs(user?.user_id)).then(() => setLoading(false))
   }, [user])
   const changeModalState = (state: boolean) => {
      setModal(state);
   };
   useEffect(() => { dispatch(GetTrackinLibrary(user?.user_id)) }, [user])
   useEffect(() => {
      if (genres) {
         setGenres_arr(genres);
      }
   }, [genres])

   useEffect(() => {
      if (songs) {
         setSongs_array(songs);
      }
   }, [songs])



   const AddTrackFunc = () => {
      const data = new FormData();
      data.append('user_id', user?.user_id);
      data.append("track_title", name);
      data.append("track_image", image);
      data.append("track_content", audio);
      data.append("genre_id", genre);
      const form = {
         user_id: data.get("user_id"),
         track_title: data.get("track_title"),
         track_image: data.get("track_image"),
         track_content: data.get("track_content"),
         genre_id: data.get("genre_id"),
      }
      console.log(form);
      dispatch(AddTrack(form));
      setModal(false)
   }


   return (
      <div className="wrapper">
         <div className="wrapper_all">
            {modal && (
               <Modal ChangeModal={changeModalState}>
                  <div className="modal_content">
                     <h1 className="title">Add track</h1>
                     <h2 className="name">Name</h2>
                     <input
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setName(e.target.value)
                        }
                     />
                     <div className="block">
                        {!image ? (
                           <>
                              <label htmlFor="photolabel">
                                 <span>Image</span>
                                 <img
                                    src={process.env.PUBLIC_URL + "/icons/download.svg"}
                                    alt=""
                                 />
                              </label>
                              <input
                                 type="file"
                                 id={"photolabel"}
                                 accept=".jpg, .jpeg, .png"
                                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setImage(e.target.files![0])
                                 }
                              />
                           </>
                        ) : (
                           <div className="images">
                              <img
                                 className="images_main"
                                 src={URL.createObjectURL(image)}
                                 alt="photo"
                              />
                              <button onClick={() => setImage(null)}>Cansel</button>
                           </div>
                        )}
                        {audio ? (
                           <div className="images">
                              <audio
                                 src={URL.createObjectURL(audio)}
                                 controls
                                 className="audio_main"
                              />
                              <button onClick={() => setAudio(null)}>Cansel</button>
                           </div>
                        ) : (
                           <>
                              <label htmlFor="audiolabel">
                                 <span>Music</span>
                                 <img
                                    src={process.env.PUBLIC_URL + "/icons/download.svg"}
                                    alt=""
                                 />
                              </label>
                              <input
                                 type="file"
                                 id={"audiolabel"}
                                 accept=".mp3, .wav"
                                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAudio(e.target.files![0])
                                 }
                              />
                           </>
                        )}
                     </div>
                     <div className="select">
                        <h2 className="name">Genre</h2>
                        <select
                           className="select"
                           value={genre}
                           onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                              setGenre(e.target.value)
                           }
                        >
                           {genres_arr?.map((item: any, index: number) => (
                              <option key={item?.genre_id} value={item?.genre_id}>
                                 {item?.genre_name}
                              </option>
                           ))
                           }
                        </select>
                     </div>
                     <div className="buttons">
                        <button className="cansel">Cansel</button>
                        <button className="submit" onClick={AddTrackFunc}>Submit</button>
                     </div>
                  </div>
               </Modal>
            )}
            <div className="pageaddtrack">
               <div className="block_button">
                  <div className="button_add_music" onClick={() => setModal(true)}>
                     <span>Add track</span>
                     <img src={process.env.PUBLIC_URL + "/icons/plus.svg"} alt="" />
                  </div>
               </div>
               <div className="songs">

                  {
                     loading ? (
                        <div className="loading_">
                           <Loading />
                        </div>
                     ) :
                        (

                           Array.isArray(songs_array) && songs_array.map?.((item: any, ind: number) => (
                              <Song
                                 active={index === ind ? true : false}
                                 item={item}
                                 index={ind}
                                 songs_array={songs_array}
                                 key={item?.track_id}
                              />

                           ))
                        )}



               </div>
            </div>
         </div>
      </div>
   );
};

export default PageAddTrack;
