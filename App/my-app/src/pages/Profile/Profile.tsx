import React from 'react';
import { FC } from 'react';
import "./Profile.css"
import { Link } from 'react-router-dom';
const Profile: FC = () => {
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="profile">
               <div className="block_text_image">
                  <h1 className="title">
                     Profile
                  </h1>
                  <img src={process.env.PUBLIC_URL + "/icons/in.svg"} alt="" />
               </div>
               <div className="block_info_full">
                  <div className="block_text">
                     <p className="state">
                        Name
                     </p>

                     <div className="value">
                        Andrey
                     </div>
                     <div className="line"></div>
                  </div>
                  <div className="block_text">
                     <p className="state">
                        Gmail
                     </p>
                     <div className="value">
                        Andrey.ahve.gmaol
                     </div>
                     <div className="line"></div>
                  </div>
                  <div className="block_text">
                     <p className="state">
                        Date of birthday
                     </p>
                     <div className="value">
                        15.10.2003
                     </div>
                     <div className="line"></div>
                  </div>
                  <Link to={"/user/edit"} className="change">
                     Change
                  </Link>

               </div>
            </div>
         </div>
      </div>
   );
}

export default Profile;
