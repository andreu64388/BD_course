import React from 'react';
import { FC } from 'react';
import Song from './../../componets/Song/Song';
import "./Executor.css"
const Executor: FC = () => {
   return (
      <div className='wrapper'>
         <div className="executor">
            <h1 className="title">
               INSTASAMKA
            </h1>

            <div className="about_track" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/icons/in.svg"})` }}>
            </div>
            <div className="wrapper_all">
               <div className="players">
                  <div className="music_player">
                     <img src={process.env.PUBLIC_URL + "/icons/Player.svg"} alt="" />
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

export default Executor;
