import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const Error: FC = () => {
   return (
      <div className="error">
         <p>
            Error 404
         </p>
         <Link to="/">
            <button className="go-home-btn">Go Home</button>
         </Link>
      </div>
   );
}

export default Error;
