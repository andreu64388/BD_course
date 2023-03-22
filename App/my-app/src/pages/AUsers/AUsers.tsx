import React, { ChangeEvent } from 'react';
import { FC, useState } from 'react';
import Table from './../../componets/Table/Table';
import { Link } from 'react-router-dom';
import "./Users.css"
import Modal from './../../componets/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { GetUsers } from '../../redux/Admin/CreateAdmin';
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


const AdminUsers: FC = () => {
   const dispatch = useAppDispatch();
   const { users }: any = useAppSelector(state => state.admin)
   const [modal, setModal] = useState<boolean>(false);
   const [name, setName] = useState<string>("");
   const [genre, setGenre] = useState<string>("");
   const [usersA, setUsersA] = useState<any[]>([]);
   const [image, setImage] = useState<string | any>("");
   const [password, setPassword] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [value, setValue] = useState<string>("");
   useEffect(() => {
      dispatch(GetUsers())
   }, [])
   useEffect(() => {
      if (users) {
         setUsersA(users)
      }
   }, [users])


   const changeModalState = (state: boolean) => {
      setModal(state)
   }
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="users">
               <h1 className="title">
                  Users
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
                  <div className="input_search">
                     <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                     <input value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                     <img className='clear'
                        src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                        alt="clear" onClick={() => setValue("")} />
                  </div>
                  <div className="add_user" onClick={() => setModal(true)}>
                     Add user
                  </div>
               </div>
               <div className="about_table">
                  <Table data={usersA?.filter((item: any) => {
                     const regex = new RegExp(value, "gi");
                     return regex.test(item.user_name) || regex.test(item.user_email)
                        || regex.test(item.user_id) ||
                        regex.test(item.role_name);
                  })} />
               </div>
            </div>
            {modal && <Modal ChangeModal={changeModalState} >
               <div className='modal_content'>
                  <h1 className="title">Add user</h1>
                  <h2 className="name">
                     Name
                  </h2>
                  <input
                     type="text"
                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                  <h2 className="name">
                     Email
                  </h2>
                  <input
                     type="text"
                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                  <h2 className="name">
                     Password
                  </h2>
                  <input
                     type="password"
                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                  <div className="block">
                     {!image ? (<><label htmlFor="photolabel">
                        <span>Image</span>
                        <img src={process.env.PUBLIC_URL + "/icons/download.svg"} alt="" />
                     </label>
                        <input type="file" id={"photolabel"}
                           accept=".jpg, .jpeg, .png"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files![0])}
                        />
                     </>) : (
                        <div className='images'>
                           <img className='images_main' src={URL.createObjectURL(image)} alt="photo" />
                           <button onClick={() => setImage(null)}>Cansel</button>
                        </div>
                     )}

                  </div>
                  <div className="select">
                     <h2 className="name">
                        Genre
                     </h2>
                     <select className='select'
                        value={genre}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)}
                     >
                        <option value="Test">Test</option>
                     </select>
                  </div>
                  <div className="buttons">
                     <button className='cansel'>
                        Cansel
                     </button>
                     <button className='submit'>
                        Submit
                     </button>
                  </div>
               </div>
            </Modal >}
         </div>

      </div>
   );
}

export default AdminUsers;
