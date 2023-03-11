import React from 'react';
import { FC } from 'react';
import "./ADashboard.css"
import Table from './../../componets/Table/Table';
import { Link } from 'react-router-dom';
import Genre from '../../componets/Genre/Genre';
const AdminDashboard: FC = () => {

   const value = [
      {
         name: 'INSTASAMLA',
         email: 'INSTASAMLA',
         date: 'INSTASAMLA',
         id: "el",
         password: "et"
      },
      {
         name: 'INSTASAMLA',
         email: 'INSTASAMLA',
         date: 'INSTASAMLA',
         id: "el",
         password: "et"
      },
      {
         name: 'INSTASAMLA',
         email: 'INSTASAMLA',
         date: 'INSTASAMLA',
         id: "el",
         password: "et"
      },
      {
         name: 'INSTASAMLA',
         email: 'INSTASAMLA',
         date: 'INSTASAMLA',
         id: "el",
         password: "et"
      },
      {
         name: 'INSTASAMLA',
         email: 'INSTASAMLA',
         date: 'INSTASAMLA',
         id: "el",
         password: "et"
      }
   ]
   const headers = ["id", "name"]
   const date = [
      {
         id: "te",
         name: "tr"
      },
      {
         id: "2   e",
         name: "tr"
      }
   ]

   const uptable: string[] = ['Name', 'Email', 'password', 'date', 'Action'];
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="dashboard">
               <h1 className="title">
                  Dashboard
               </h1>
               <div className="dashboard_blocks">
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/dashuser.svg"} alt="" />
                        <p>Users</p>
                     </div>
                     <div className="count">
                        320
                     </div>
                  </div>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/song.svg"} alt="" />
                        <p>Songs</p>
                     </div>
                     <div className="count">
                        320
                     </div>
                  </div>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/genres.svg"} />
                        <p>Genres</p>
                     </div>
                     <div className="count">
                        320
                     </div>
                  </div>
               </div>
               <div className="about_table">
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/dashuser.svg"} alt="" />
                        <p>Users</p>
                     </div>
                  </div>
                  <Table data={value} />
                  <Link to={"/admin/users"} className="see_button">
                     Veiw all
                  </Link>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/song.svg"} alt="" />
                        <p>Song</p>
                     </div>
                  </div>
                  <Table data={value} />

                  <Link to={"/admin/songs"} className="see_button">
                     Veiw all
                  </Link>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/genres.svg"} alt="" />
                        <p>Genres</p>
                     </div>
                  </div>
                  <Genre headers={headers} data={date} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default AdminDashboard;
