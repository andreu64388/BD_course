import React from 'react';
import { FC, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css"
import { useState } from 'react';
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

const Register: FC = () => {
   const [name, setName] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [day, setDay] = useState<string>('')
   const [month, setMonth] = useState<string>('')
   const [year, setYear] = useState<string>('')
   const [image, setImage] = useState<string | any>('')
   return (
      <div className="wrapper_all">
         <div className='regiser'>
            <h1 className="title">
               Register
            </h1>
            <div className="block_form">
               <div className="block">
                  <h2 className="enter_value">
                     Your email
                  </h2>
                  <input
                     type="email"
                     value={email}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                     placeholder='Andrey...' />
               </div>
               <div className="block">
                  <h2 className="enter_value">
                     Your password
                  </h2>
                  <input
                     type="password"
                     value={password}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                     placeholder='Andrey...' />
               </div>
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
                     <input
                        type="text"
                        value={day}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDay(e.target.value)}
                        maxLength={2}
                        placeholder='12' />
                     <select id="months"
                        value={month}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setMonth(e.target.value)}>
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
                        placeholder='2003'
                        maxLength={4} />
                  </div>
               </div>
               <div className="buttom_download">
                  {!image ? (<><label htmlFor="photolabel">
                     <span>Image</span>
                     <img src={process.env.PUBLIC_URL + "/icons/download.svg"} alt="" />
                  </label>
                     <input type="file" id={"photolabel"}
                        accept=".jpg, .jpeg, .png"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files![0])}
                     />
                  </>) : (
                     <div className='images'>
                        <img className='images_main' src={URL.createObjectURL(image)} alt="photo" />
                        <button onClick={() => setImage(null)}>Cansel</button>
                     </div>
                  )}
               </div>
               <button className="submit">
                  Register
               </button>
               <div className="login">
                  <span>Do you account? </span>
                  <Link to={"/user/login"}>Login</Link>
               </div>
            </div>
         </div>
      </div>
   );
}
export default Register;
