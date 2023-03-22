import React from 'react';
import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { LoginUser } from '../../redux/User/CreateUser';
const Login: FC = () => {
   const { token, admin }: any = useAppSelector(state => state.user);

   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
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

   const Login = () => {
      const data = {
         user_email: email,
         user_password: password
      }
      dispatch(LoginUser(data))

   }
   return (
      <div className="wrapper_all">
         <div className='login_main'>
            <h1 className="title">
               Login
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

               <button className="submit" onClick={Login}>
                  Login
               </button>

               <div className="login">
                  <span>Do you account? </span>
                  <Link to={"/user/register"}>Register</Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
