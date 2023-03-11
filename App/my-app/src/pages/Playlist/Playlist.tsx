import React, { ChangeEvent } from 'react';
import { FC } from 'react';
import CardSong from './../../componets/CardSong/CardSong';
import "./Playlist.css"
import { useState } from 'react';
import Modal from './../../componets/Modal/Modal';
import Song from './../../componets/Song/Song';
const item =
{
   id_track: "1",
   title: "Я отключаю телефон",
   img: "/icons/Instasamka.svg",
   artist: [
      {
         artist: "Test",
         link: "/user/executor/:executor_id"
      }
   ],
   link_track: "/user/track/:track_id",

}
const Playlist: FC = () => {
   const [edit, setEdit] = useState<boolean>(true)
   const [modal, setModal] = useState<boolean>(false)
   const [title, setTitle] = useState<string>("");
   const [value, setValue] = useState<string>("");

   const ChangeModal = (state: boolean) => {
      setModal(state)
   }

   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="playlist">
               <div className="title_button">
                  <h1 className="title">
                     Recently listened to
                  </h1>
                  {
                     edit && (<button onClick={() => setModal(true)}>
                        Edit
                     </button>)
                  }
               </div>
               <div className="blocks_card">
                  <CardSong item={item} />
                  <CardSong item={item} />
                  <CardSong item={item} />
                  <CardSong item={item} />
                  <CardSong item={item} />
               </div>
               {modal &&
                  (<Modal ChangeModal={ChangeModal}>
                     <div className="modal_content_change">
                        <h1 className="title">
                           Add play liset
                        </h1>
                        <div className="blocks">
                           <div className="block">
                              <h2 className="enter_value">
                                 Title
                              </h2>
                              <input
                                 type="text"
                                 title={title}
                                 onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                 placeholder='Andrey...' />
                           </div>
                           <div className="block">
                              <h2 className="enter_value">
                                 Songs
                              </h2>
                              <div className="songs_result">
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
                              </div>
                              <div className="input_search">
                                 <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                                 <input value={value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                                 <img className='clear'
                                    src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                                    alt="clear" onClick={() => setValue("")} />
                              </div>
                              <div className="songs_result">
                              </div>
                           </div><section></section>
                           <div className="save">
                              Save
                           </div>
                        </div>
                     </div>
                  </Modal>)}
            </div>
         </div>
      </div>
   );
}

export default Playlist;
