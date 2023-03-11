import React from 'react';
import { FC, ChangeEvent } from 'react';
import "./Search.css"
import { useState } from 'react';
import Song from './../../componets/Song/Song';
import CardSong from './../../componets/CardSong/CardSong';
import { Link } from 'react-router-dom';


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

const item =
{
   id_track: "1",
   title: "Я отключаю телефон",
   img: "/icons/Instasamka.svg",
   artist: ["Insasamka", "Oleg"],
   link: ["d", "ds"],
   link_track: "ttest",

}

const Search: FC = () => {
   const [value, setValue] = useState("");
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="search">
               <div className="input_search">
                  <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                  <input value={value}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                  <img className='clear'
                     src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                     alt="clear" onClick={() => setValue("")} />
               </div>
               <div className="response">

                  {
                     value.trim().length == 0
                     && (<div className="ifnotsearch">
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
                     </div>)
                  }

                  <div className="response_with_playlist_and_songs">

                     {value.trim().length > 0 && (
                        <>   <div className="songs">
                           <h1 className="title">
                              Songs
                           </h1>
                           <div className="songs_blocks">
                              <Song />
                              <Song />
                           </div>
                        </div>
                           <div className="playlist">
                              <h1 className="title">
                                 Playlist
                              </h1>

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
                           </div></>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Search;
