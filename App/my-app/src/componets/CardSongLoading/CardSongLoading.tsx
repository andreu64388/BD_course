import React from "react";
import "./CardSongLoading.css";

const CardSongLoading: React.FC = () => {
   return (
      <div className="card_songs">

         <div className="cards">
            {Array.from({ length: 5 }, (_, i) => (
               <div className="card_song_loading">

               </div>
            ))}
         </div>

      </div>

   );
};

export default CardSongLoading;
