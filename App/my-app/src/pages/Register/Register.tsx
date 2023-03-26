import React from 'react';
import { FC, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RegisterUser } from './../../redux/User/CreateUser';
import Loading from './../../componets/Loading/Loading';

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

   const { token, admin, loading, message }: any = useAppSelector(state => state.user);

   const [name, setName] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [day, setDay] = useState<string>('')
   const [month, setMonth] = useState<string>('')
   const [year, setYear] = useState<string>('')
   const [image, setImage] = useState<File | any>(null);
   const [messages, setMessages] = useState<string>('')

   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (token) {
         if (admin) {
            return navigate("/admin/dashboard");
         }
         return navigate("/");
      }
   }, [token]);

   const Register = async () => {
      if (name.trim().length == 0) {
         setMessages('Name is required')
      }
      else if (password.trim().length == 0) {
         setMessages('Password is required')
         if (password.length < 5) {
            setMessages("Password want to have at least 5 characters")
         }
      }
      else if (email.trim().length == 0) {
         setMessages('Email is required')
      }
      else if (day.trim().length == 0) {
         setMessages('Day is required')
      }
      else if (month.trim().length == 0) {
         setMessages('Month is required')
      }
      else if (year.trim().length == 0) {
         setMessages('Year is required')
      }
      else if (image == null) {
         setMessages('Image is required')
      }
      else {

         const monthId = months.indexOf(month) + 1;
         const formData = new FormData();

         formData.append("name", name);
         formData.append("user_email", email);
         formData.append("user_password", password);
         formData.append("user_date_of_birth", `${day}-${monthId}-${year}`);
         formData.append("user_role_id", "1");
         formData.append("user_image", image);

         const form = {
            user_name: formData.get("name"),
            user_email: formData.get("user_email"),
            user_password: formData.get("user_password"),
            user_date_of_birth: formData.get("user_date_of_birth"),
            user_role_id: formData.get("user_role_id"),
            user_img: formData.get("user_image"),
         }
         await dispatch(RegisterUser(form));
      }
   }

   const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      setImage(file);
   };

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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageChange(e)}
                     />
                  </>) : (
                     <div className='images'>
                        <img className='images_main' src={URL.createObjectURL(image)} alt="photo" />
                        <button onClick={() => setImage(null)}>Cansel</button>
                     </div>
                  )}
               </div>
               <div className="message">
                  {message}
               </div>
               <button className="submit" onClick={Register}>
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
