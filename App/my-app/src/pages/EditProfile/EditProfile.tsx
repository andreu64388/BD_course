import React, { useState } from 'react';
import { FC, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import "./EditProfile.css"
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
   const [name, setName] = useState<string>('')
   const [day, setDay] = useState<string>('')
   const [month, setMonth] = useState<string>('')
   const [year, setYear] = useState<string>('')
   const [image, setImage] = useState<string>('')
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="profile_edit">
               <div className="block_text_image">
                  <h1 className="title">
                     Change profile
                  </h1>
                  <div className="img">
                     <img src={process.env.PUBLIC_URL + "/icons/in.svg"} alt="" />
                     <button className="update">
                        Update
                     </button>
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
                           {months.map((month) => (
                              <option key={month} value={month}>
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

                  <button className="save">
                     Save
                  </button>
               </div>


            </div>
         </div>
      </div>
   );
}

export default EditProfile;
