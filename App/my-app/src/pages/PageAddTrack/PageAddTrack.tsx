import React from "react";
import { FC, ChangeEvent } from "react";
import Song from "../../componets/Song/Song";
import "./PageAddTrack.css";
import { useState } from "react";
import Modal from "./../../componets/Modal/Modal";
const PageAddTrack: FC = () => {
   const [modal, setModal] = useState<boolean>(false);
   const [name, setName] = useState<string>("");
   const [genre, setGenre] = useState<string>("");
   const [image, setImage] = useState<string | any>("");
   const [audio, setAudio] = useState<string | any>("");
   const changeModalState = (state: boolean) => {
      setModal(state);
   };
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
                              {" "}
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
                           <option value="Test">Test</option>
                        </select>
                     </div>
                     <div className="buttons">
                        <button className="cansel">Cansel</button>
                        <button className="submit">Submit</button>
                     </div>
                  </div>
               </Modal>
            )}
            <div className="pageaddtrack">
               <div className="block_button">
                  <div className="button_add_music" onClick={() => setModal(true)}>
                     <span>Add track</span>
                     <img src={process.env.PUBLIC_URL + "/icons/plus.svg   "} alt="" />
                  </div>
               </div>
               <div className="songs">
                  <Song />
               </div>
            </div>
         </div>
      </div>
   );
};

export default PageAddTrack;
