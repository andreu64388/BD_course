import React, { ChangeEvent } from 'react';
import { FC, useState } from 'react';
import Table from './../../componets/Table/Table';
import { Link } from 'react-router-dom';
import "./Users.css"
import Modal from './../../componets/Modal/Modal';
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
   const [modal, setModal] = useState<boolean>(false);
   const [name, setName] = useState<string>("");
   const [genre, setGenre] = useState<string>("");
   const [image, setImage] = useState<string | any>("");
   const [password, setPassword] = useState<string>("");
   const [email, setEmail] = useState<string>("");

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
                        320
                     </div>
                  </div>
                  <div className="add_user" onClick={() => setModal(true)}>
                     Add user
                  </div>

               </div>
               <div className="about_table">

                  <Table data={value} />

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
