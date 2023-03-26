import React from 'react';
import { FC, ChangeEvent } from 'react';
import Table from './../../componets/Table/Table';
import "./Songs.css"
import Modal from './../../componets/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { useEffect } from 'react';
import { GetTracks } from './../../redux/Admin/CreateAdmin';

const AdminSongs: FC = () => {

   const { tracks }: any = useAppSelector(state => state.admin)
   const [modal, setModal] = useState<boolean>(false);
   const [name, setName] = useState<string>("");
   const [genre, setGenre] = useState<string>("");
   const [image, setImage] = useState<string | any>("");
   const [audio, setAudio] = useState<string | any>("");
   const [tracksA, setTracksA] = useState<any[]>([]);
   const [value, setValue] = useState<string>("");
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(GetTracks())
   }, [])

   useEffect(() => {
      if (tracks) {
         setTracksA(tracks)
      }
   }, [tracks])
   
   const changeModalState = (state: boolean) => {
      setModal(state)
   }
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="users">
               <h1 className="title">
                  Songs
               </h1>
               <div className="dashboard_blocks">
                  <div className="block">
                     <div className="block_img">
                        <img src={process.env.PUBLIC_URL + "/icons/dashuser.svg"} alt="" />
                        <p>Songs</p>
                     </div>
                     <div className="count">
                        {tracksA?.length}
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
                     Add song
                  </div>

               </div>
               <div className="about_table">
                  <Table data_songs={tracksA.filter((item: any) => {
                     const regex = new RegExp(value, "gi");
                     return regex.test(item?.genre_name) || regex.test(item.track_title) || regex.test(item?.track_id)
                        || regex.test(item.user_id)
                  })} />

               </div>
            </div>
            {modal && <Modal ChangeModal={changeModalState} >
               <div className='modal_content'>
                  <h1 className="title">Add song</h1>
                  <h2 className="name">
                     Name
                  </h2>
                  <input
                     type="text"
                     value={name}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
                     {audio ?
                        (
                           <div className='images'>
                              <audio src={URL.createObjectURL(audio)} controls className='audio_main' />
                              <button onClick={() => setAudio(null)}>Cansel</button>
                           </div>
                        ) : (
                           <>    <label htmlFor="audiolabel">
                              <span>Music</span>
                              <img src={process.env.PUBLIC_URL + "/icons/download.svg"} alt="" />
                           </label>
                              <input type="file" id={"audiolabel"}
                                 accept=".mp3, .wav"
                                 onChange={(e: ChangeEvent<HTMLInputElement>) => setAudio(e.target.files![0])}
                              /></>
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

export default AdminSongs;
