import React from 'react';
import { FC } from 'react';
import CardSong from './../../componets/CardSong/CardSong';
import "./Home.css"
import { Link } from 'react-router-dom';
import Tabulation from './../../componets/Tab/Tab';
const values = [
   {
      id: 1,
      name: "Home",
      author: ["Andter", "te"],
      img: "/icons/home.svg",
   },
   {
      id: 2,
      name: "Home",
      author: ["Andter", "te"],
      img: "/icons/home.svg",
   },

]
const item =
{
   id_track: "1",
   title: "Я отключаю телефон",
   img: "/icons/Instasamka.svg",
   artist: [
      {
         artist: "Test",
         link: "/user/executor/:executor_id"
      }
   ],
   link_track: "/user/track/:track_id",

}



const Home: FC = () => {
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="center">
               <div className="homes">
                  <div className="blocks_reccomemd">
                     <div className="recoomecd_text">
                        <h1 className="title">
                           Recently listened to
                        </h1>
                        <Link to={"/user/playlist/:playlist_id"}>Show all</Link>
                     </div>
                     <div className="blocks_card">
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                     </div>
                  </div>
                  <div className="blocks_reccomemd">
                     <div className="recoomecd_text">
                        <h1 className="title">
                           Recently listened to
                        </h1>
                        <a href="">Show all</a>
                     </div>
                     <div className="blocks_card">
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                     </div>
                  </div>
                  <div className="blocks_reccomemd">
                     <div className="recoomecd_text">
                        <h1 className="title">
                           Recently listened to
                        </h1>
                        <a href="">Show all</a>
                     </div>
                     <div className="blocks_card">
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                        <CardSong item={item} />
                     </div>
                  </div>
                 
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
