import React from 'react';
import { FC, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
const Login: FC = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

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

               <button className="submit">
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
