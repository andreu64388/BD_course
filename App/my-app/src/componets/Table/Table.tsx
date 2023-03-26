import React from 'react';
import './Table.css';
import { useEffect, ChangeEvent } from 'react';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { DeleteUser } from '../../redux/Admin/CreateAdmin';
import { DeleteTrack } from './../../redux/Admin/CreateAdmin';


interface TableProps {
   data?: { name: string, email: string, date: string, password: string, id: string }[];
   data_songs?: { img: string, name: string, date: string, id_user: string, genre: string }[];
   maxPage?: number;
}

const Table: React.FC<TableProps> = ({ data, maxPage, data_songs }) => {
   const first: string[] = ['id_track', 'Img', 'Name', 'Date', "id_user", "Genre", 'Action'];
   const two: string[] = ['id_user', 'Name', 'Email', 'Role', 'Date', 'Action'];
   const [datas, setDatas] = React.useState<any>(data);
   const [upDatas, setUpDatas] = React.useState<any>(first);
   const [modal, setModal] = React.useState<boolean>(false);
   const [isUser, setUser] = React.useState<boolean>(false);
   const [image, setImage] = useState<string | any>("");
   const [role, setRole] = useState<string>("");
   const [name, setName] = React.useState<string>("");
   const [email, setEmail] = React.useState<string>("");
   const [password, setPassword] = React.useState<string>("");
   const [genre, setGenre] = React.useState<string>("");
   const [img, setImg] = React.useState<string>("");
   const dispatch = useAppDispatch();
   const ChangeModal = (state: boolean) => {
      setModal(state)
   }

   useEffect(() => {
      if (!data) {
         setUpDatas(first);
      }
      else {
         setUpDatas(two);
      }
      if (maxPage) {

         if (data == null) {
            setDatas(data_songs?.slice(0, maxPage));
         }
         else {
            setDatas(data?.slice(0, maxPage));
         }
      }
      else {
         if (data == null) {
            setDatas(data_songs);
         }
         else {
            setDatas(data);
         }
      }
   }, [data, data_songs])


   const Edit = (id: string, el: any, state: boolean) => {
      setUser(!state)
      setModal(true);
      if (state) {

         setName(el?.user_name);
         setEmail(el?.user_email);
         setPassword(el?.password);
         alert("Ted")
         setImg(el.img);
      }
      else {
         alert(id)
         setName(el?.user_name);
         setEmail(el?.user_email);
         setPassword(el?.password);
         setRole(el?.role_name);
      }

   }

   const DeleteUsers = (id: string) => {
      alert(id)
      dispatch(DeleteUser(id))

   }

   const DeleteTracks = (id: string) => {
      alert(id)
      dispatch(DeleteTrack(id))
   }
   
   return (
      <div className="table-container">
         <div className="table-header">
            {upDatas?.map((row: any, index: any) => (
               <div className="table-cell" key={index}>{row}</div>
            )
            )}
         </div>
         <div className="table-body">
            {data ? (<>
               {datas?.map((row: any, index: any) => {
                  return (<div className="table-row" key={index}>
                     <div className="table-cell">{row?.user_id}</div>
                     <div className="table-cell">{row?.user_name}</div>
                     <div className="table-cell">{row?.user_email}</div>
                     <div className="table-cell">{row?.role_name}</div>
                     <div className="table-cell">{row?.user_date_of_birth.slice(0, 10)}</div>
                     <div className="table-cell buttons">
                        <button onClick={() => Edit(row?.user_id, row, false)}>
                           <img src={process.env.PUBLIC_URL + "/icons/pencil.svg"} alt="" />
                        </button>
                        <button onClick={() => DeleteUsers(row?.user_id)}>
                           <img src={process.env.PUBLIC_URL + "/icons/rubish.svg"} alt="" />
                        </button>
                     </div>
                  </div>)
               }

               )}
            </>) : (<>
               {datas?.map((row: any, index: any) => (
                  <div className="table-row" key={index}>
                     <div className="table-cell">{row?.track_id}</div>
                     <div className="table-cell">
                        <img src={row?.track_image} alt="" />
                     </div>
                     <div className="table-cell">{row?.track_title}</div>
                     <div className="table-cell">{row?.track_date.slice(0, 10)}</div>
                     <div className="table-cell">{row?.users?.map((el: any) => <span>   {el?.user_id}</span>
                     )}</div>
                     <div className="table-cell">{row?.genre_name}</div>
                     <div className="table-cell buttons">
                        <button onClick={() => Edit(row?.track_id, row, true)}>
                           <img src={process.env.PUBLIC_URL + "/icons/pencil.svg"} alt="" />
                        </button>
                        <button onClick={() => DeleteTracks(row?.track_id)}>
                           <img src={process.env.PUBLIC_URL + "/icons/rubish.svg"} alt="" />
                        </button>
                     </div>
                  </div>
               ))}</>)}
         </div>
         {modal && <Modal ChangeModal={ChangeModal} >
            {isUser ? (<div className="modal_content_change">
               <h1 className="title">
                  Change user
               </h1>
               <div className="blocks">
                  <div className="block">
                     <h2 className="enter_value">
                        Name
                     </h2>
                     <input
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder='Andrey...' />
                  </div>
                  <div className="block">
                     <h2 className="enter_value">
                        Email
                     </h2>
                     <input
                        type="text"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder='Andrey...' />
                  </div>

                  <div className="block">
                     <h2 className="enter_value">
                        Role
                     </h2>
                     <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                     </select>
                  </div>
                  <div className="save">
                     Save
                  </div>
               </div>

            </div>) : (
               <div className="modal_content_change">
                  <h1 className="title">
                     Change song
                  </h1>
                  <div className="blocks">
                     <div className="block">
                        <h2 className="enter_value">
                           Name
                        </h2>
                        <input
                           type="text"
                           value={name}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                           placeholder='Andrey...' />
                     </div>
                     <div className="block">
                        <h2 className="enter_value">
                           Genre
                        </h2>
                        <select value={genre}
                           onChange={(e: ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)}>

                           <option value="test">Rock</option>
                        </select>
                     </div>
                     <div className="block">
                        <h2 className="enter_value">
                           Image
                        </h2>

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
                     <div className="save">
                        Save
                     </div>
                  </div>

               </div>
            )}
         </Modal>}
      </div >
   );
};
export default Table;
