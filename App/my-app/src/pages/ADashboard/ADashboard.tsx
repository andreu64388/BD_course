import React from 'react';
import { FC, useState } from 'react';
import "./ADashboard.css"
import Table from './../../componets/Table/Table';
import { Link } from 'react-router-dom';
import Genre from '../../componets/Genre/Genre';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { GetTracks, GetUsers, GetGenres } from './../../redux/Admin/CreateAdmin';
const AdminDashboard: FC = () => {
   const dispatch = useAppDispatch();
   const { tracks, users, genres }: any = useAppSelector(state => state.admin)
   const [tracksA, setTracksA] = useState<any[]>([]);
   const [usersA, setUsersA] = useState<any[]>([]);
   const [genresA, setGenresA] = useState<any[]>([]);
   useEffect(() => {
      dispatch(GetTracks())
      dispatch(GetUsers())
      dispatch(GetGenres())
   }, [])

   useEffect(() => {
      if (tracks) {
         setTracksA(tracks)
      }
   }, [tracks])

   useEffect(() => {
      if (users) {
         console.log(users.slice(0, 5))
         setUsersA(users)
      }
   }, [users])

   useEffect(() => {
      if (genres) {
         setGenresA(genres)
      }
   }, [genres])
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
   const headers = ["genre_id", "genre_name"]
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
                        {usersA?.length}
                     </div>
                  </div>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/song.svg"} alt="" />
                        <p>Songs</p>
                     </div>
                     <div className="count">
                        {tracksA?.length}
                     </div>
                  </div>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/genres.svg"} />
                        <p>Genres</p>
                     </div>
                     <div className="count">
                        {genresA?.length}
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
                  <Table data={usersA.slice(0, 5)} />
                  <Link to={"/admin/users"} className="see_button">
                     Veiw all
                  </Link>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/song.svg"} alt="" />
                        <p>Song</p>
                     </div>
                  </div>
                  <Table data_songs={tracksA?.slice(0, 5)} />

                  <Link to={"/admin/songs"} className="see_button">
                     Veiw all
                  </Link>
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/genres.svg"} alt="" />
                        <p>Genres</p>
                     </div>
                  </div>
                  <Genre headers={headers} data={genresA} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default AdminDashboard;
