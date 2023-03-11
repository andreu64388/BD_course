import React from 'react';
import { FC, ChangeEvent } from 'react';
import "./Password.css"
import { useState } from 'react';

const Password: FC = () => {
   const [oldPassword, setOldPassword] = useState<string>('');
   const [newPassword, setNewPassword] = useState<string>('');
   const [newPassword2, setNewPassword2] = useState<string>('');
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="password">
               <div className="block_text_image">
                  <h1 className="title">
                     Change password
                  </h1>
               </div>
               <div className="block_form">
                  <div className="block">
                     <h2 className="enter_value">
                        Your old password
                     </h2>
                     <input
                        type="password"
                        value={oldPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                        placeholder='Andrey...' />
                  </div>

                  <div className="block">
                     <h2 className="enter_value">
                        Your new password
                     </h2>
                     <input
                        type="password"
                        value={newPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                        placeholder='Andrey...' />
                  </div>

                  <div className="block">
                     <h2 className="enter_value">
                        Yet new password
                     </h2>
                     <input
                        type="password"
                        value={newPassword2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword2(e.target.value)}
                        placeholder='Andrey...' />
                  </div>
                  <button className="save">
                     Save
                  </button>
               </div>

            </div>
         </div>
      </div>
   );
}

export default Password;
