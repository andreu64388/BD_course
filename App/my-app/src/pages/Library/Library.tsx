import React from 'react';
import { FC, useState, ChangeEvent } from 'react';
import "./Library.css"
import CardSong from './../../componets/CardSong/CardSong';
import Song from '../../componets/Song/Song';
import Modal from '../../componets/Modal/Modal';
import Tabulation from './../../componets/Tab/Tab';
import { Link } from 'react-router-dom';

const item =
{
   id_track: "1",
   title: "Я отключаю телефон",
   img: "/icons/Instasamka.svg",
   artist: ["Insasamka", "Oleg"],
   link: ["d", "ds"],
   link_track: "ttest",

}
const items = [
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#7358FF',
      title: 'Home'
   },
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#1E3264',
      title: 'About'
   },
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#E8115B',
      title: 'Services'
   },
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#148A08',
      title: 'Blog'
   },
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#BC5900',
      title: 'Contact'
   },
   {
      path: '/user/playlist/:playlist_id',
      backgroundColor: '#8D67AB',
      title: 'Products'
   }
];


const Library: FC = () => {
   const [value, setValue] = useState<string>("");
   const [moddal, setModal] = useState<boolean>(false);
   const [title, setTitle] = useState<string>("");

   const ChangeModal = (state: boolean) => {
      setModal(state)
   }


   return (

      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="library">
               <div className="input_search">
                  <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                  <input value={value}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                  <img className='clear'
                     src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                     alt="clear" onClick={() => setValue("")} />
               </div>
               <div className="my_list">
                  <Tabulation tabs={[
                     {
                        title: "Songs",
                     },
                     {
                        title: "Playlist",
                     }
                  ]} >
                     <div className="songs">
                        <h1 className="title">
                           Songs
                        </h1>
                        <div className="songs_array">
                           <Song />
                           <Song />
                        </div>
                     </div>
                     <div className="playlist">
                        <h1 className="title">
                           Playlist
                        </h1>
                        <button className='add'
                           onClick={() => ChangeModal(true)}
                        >
                           Add
                        </button>

                        <div className="ifnotsearch">
                           {items?.map((el: any, index: any) => {
                              return (
                                 <Link to={el.path} key={index}>
                                    <div className="block_event" style={{ background: el.backgroundColor }}>
                                       <h1 className="title">
                                          {el.title}
                                       </h1>
                                    </div>
                                 </Link>)
                           })}
                        </div>
                     </div>
                  </Tabulation>
               </div>
               {moddal &&
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
                              <div className="input_search">
                                 <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                                 <input value={value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                                 <img className='clear'
                                    src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                                    alt="clear" onClick={() => setValue("")} />
                              </div>
                              <div className="songs_result">
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
                                 <Song isAdd={true} />
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

export default Library;
