import React from 'react';
import { FC, useEffect, useState } from 'react';
import "./Profile.css"
import { Link } from 'react-router-dom';
import { useAppSelector } from './../../redux/store';

const Profile: FC = () => {

   const { user }: any = useAppSelector(state => state.user);

   const [date, setDate] = useState<string>('')

   useEffect(() => {
      var d = new Date(user?.user_date_of_birth);
      if (user) {
         var day: any = d.getUTCDate() + 1;
         let month = d.getUTCMonth() + 1;
         var year = d.getUTCFullYear();
         setDate(`${day.toString()}-${month}-${year}`)
      }
   }, [user])

   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="profile">
               <div className="block_text_image">
                  <h1 className="title">
                     Profile
                  </h1>
                  <img src={user?.user_img} />
               </div>
               <div className="block_info_full">
                  <div className="block_text">
                     <p className="state">
                        Name
                     </p>

                     <div className="value">
                        {user?.user_name}
                     </div>
                     <div className="line"></div>
                  </div>
                  <div className="block_text">
                     <p className="state">
                        Gmail
                     </p>
                     <div className="value">
                        {user?.user_email}
                     </div>
                     <div className="line"></div>
                  </div>
                  <div className="block_text">
                     <p className="state">
                        Date of birthday
                     </p>
                     <div className="value">
                        {
                           date
                        }
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
