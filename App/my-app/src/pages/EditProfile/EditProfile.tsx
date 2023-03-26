import React, { useState } from 'react';
import { FC, ChangeEvent, useEffect } from 'react';
import "./EditProfile.css"
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { UpdateUser } from '../../redux/User/CreateUser';

const months: string[] = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

const EditProfile: FC = () => {
   const { user }: any = useAppSelector(state => state.user);
   const [name, setName] = useState<string>('')
   const [day, setDay] = useState<string>('')
   const [month, setMonth] = useState<string | any>('')
   const [year, setYear] = useState<string>('')
   const [image, setImage] = useState<string | any>('')
   const dispatch = useAppDispatch();

   useEffect(() => {
      var d = new Date(user?.user_date_of_birth);
      if (user) {
         setName(user?.user_name)
         let day = d.getUTCDate() + 1;
         setDay(day.toString());
         setMonth(d.getUTCMonth() + 1);
         setYear(d.getUTCFullYear().toString());
      }



   }, [user])


   const Save = async () => {
      const data = new FormData();
      data.append('user_id', user?.user_id);
      data.append("user_name", name);
      data.append("user_date_of_birth", `${day}-${month}-${year}`);
      if (image) {
         data.append("user_img", image);
      }
      else {
         data.append("user_img", "");
      }
      const form = {
         user_id: data.get("user_id"),
         user_name: data.get("user_name"),
         user_date_of_birth: data.get("user_date_of_birth"),
         user_img: data.get("user_img"),
      }
      await dispatch(UpdateUser(form));

   }
   
   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      setImage(file);
   }
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="profile_edit">
               <div className="block_text_image">
                  <h1 className="title">
                     Change profile
                  </h1>
                  <div className="img">
                     {
                        image ?
                           <img src={URL.createObjectURL(image)} alt="" />
                           :
                           <img src={user?.user_img} alt="" />
                     }
                     <div className="div">
                        <label htmlFor="photolabel">
                           <span>Image</span>

                        </label>
                        <input type="file" id={"photolabel"}
                           accept=".jpg, .jpeg, .png"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                        />
                     </div>
                  </div>
               </div>
               <div className="block_form">
                  <div className="block">
                     <h2 className="enter_value">
                        Your name
                     </h2>
                     <input
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder='Andrey...' />
                  </div>
                  <div className="block date">
                     <h2 className="enter_value">
                        Your date of birthday
                     </h2>
                     <div className="dates">
                        <input placeholder='12'
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setDay(e.target.value)}
                           value={day}
                        />
                        <select id="months"
                           value={month}
                           onChange={(e: ChangeEvent<HTMLSelectElement>) => setMonth(e.target.value)}
                        >
                           {months.map((month, index) => (
                              <option key={month} value={index + 1}>
                                 {month}
                              </option>
                           ))}
                        </select>
                        <input
                           type="text"
                           value={year}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
                           placeholder='2003' />
                     </div>
                  </div>
                  <button className="save" onClick={Save}>
                     Save
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditProfile;
