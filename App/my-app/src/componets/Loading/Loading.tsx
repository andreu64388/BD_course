import React from 'react';
import { FC } from 'react';
import "./Loadimg.css";
const Loading: FC = () => {
   return (
      <div className="circle-loading">
         <div className="spinner"></div>
      </div>
   );
}

export default Loading;
