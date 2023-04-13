import React, { useState } from 'react';
import Loading from './../Loading/Loading';
import "./ImageLoading.css"
interface ILoadingImage {
   img: string
}
const ImageLoading: React.FC<ILoadingImage> = ({ img }) => {
   const [loading, setLoading] = useState<boolean>(true);

   function handleImageLoad() {
      setLoading(false);
   }

   return (
      <>
         {loading && (
            <div className='block_image'>
               <Loading />
            </div>)}


         <img
            src={img}
            onLoad={handleImageLoad}
            alt={img}
            style={{ display: loading ? "none" : "block" }}
         />
      </>
   )
}

export default ImageLoading;
