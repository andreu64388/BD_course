import React from 'react';
import { FC } from 'react';
import "./Settings.css"
import CardSongLoading from './../../componets/CardSongLoading/CardSongLoading';
import Loading from './../../componets/Loading/Loading';

const Settings: FC = () => {
   return (
      <div className='wrapper' >
         <div className="wrapper_all">
            <div className="settings">
               <h1 className="title">
                  Settings
               </h1>
               <div className="block_setting">
                  <div className="block">
                     <p>
                        Theme
                     </p>
                     <select>
                        <option value="dima">Dark</option>
                     </select>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
}

export default Settings;
