import React, { ChangeEvent } from 'react';
import { FC } from 'react';
import CardSong from './../../componets/CardSong/CardSong';
import "./Playlist.css"
import { useState } from 'react';
import Modal from './../../componets/Modal/Modal';
import Song from './../../componets/Song/Song';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GetTracksInPlaylist, ResetPlaylist, DeletenPlaylist, GetAllTracks } from './../../redux/Song/CreateSong';
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



const Playlist: FC = () => {
   const { tracks_in_playlist, songs, title_playlist, user_id_playlist, all_songs }: any = useAppSelector(state => state.song)
   const { user }: any = useAppSelector(state => state.user)
   const [edit, setEdit] = useState<boolean>(true)
   const [modal, setModal] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(title_playlist);
   const [value, setValue] = useState<string>("");
   const [playlist, setPlaylist] = useState<any>([]);
   const [arr, setArr] = useState<any>([]);
   const { playlist_id } = useParams();
   const dispatch = useAppDispatch();
   const navigate = useNavigate()
   useEffect(() => {
      dispatch(GetTracksInPlaylist(playlist_id))
      dispatch(GetAllTracks())
      return () => {
         dispatch(ResetPlaylist())
      }
   }, [])


   useEffect(() => {

      if (Number(user_id_playlist) === Number(user?.user_id)) {
         setEdit(true)
      }
      else {
         setEdit(false)
      }
   }, [user, user_id_playlist])


   useEffect(() => {
      if (tracks_in_playlist) {
         setPlaylist(tracks_in_playlist)
         setTitle(title_playlist)
      }
   }, [tracks_in_playlist])

   const ChangeModal = (state: boolean) => {
      setModal(state)

   }



   const Save = () => {
      setModal(false)
   }
   const DeletePlaylistFunc = () => {
      const data = {
         playlist_id: playlist_id,
         user_id: user?.user_id
      }
      dispatch(DeletenPlaylist(data))
      navigate("/user/library")

   }
   const ChangeTitle = () => {
      alert(title)
   }
   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="playlist">
               <div className="title_button">
                  <h1 className="title">
                     {title_playlist && title_playlist}
                  </h1>
                  {
                     edit && (<div>
                        <button onClick={DeletePlaylistFunc}>
                           delete
                        </button>
                        <button onClick={() => setModal(true)}>
                           Edit
                        </button></div>)
                  }
               </div>
               <div className="blocks_card">
                  {
                     playlist?.map((item: any, index: number) => {
                        <CardSong item={item} />
                     })
                  }

                  {playlist?.map((el: any, index: number) => {
                     return (
                        <CardSong item={el} />
                     )
                  })
                  }
               </div>
               {modal &&
                  (<Modal ChangeModal={ChangeModal}>
                     <div className="modal_content_change">
                        <h1 className="title">
                           Add play liset
                        </h1>
                        <div className="blocks">
                           <div className="block">
                              <h2 className="enter_value">
                                 Title
                              </h2>
                              <input
                                 type="text"
                                 value={title}
                                 onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                 placeholder='Andrey...' />
                              <button onClick={ChangeTitle}>
                                 Save
                              </button>
                           </div>

                           <div className="block">
                              <h2 className="enter_value">
                                 Songs
                              </h2>
                              <div className="songs_result">
                                 {
                                    playlist?.map((item: any, index: number) => {
                                       return <Song isAdd={true} item={item} playlist_id={playlist_id} />
                                    })
                                 }

                              </div>
                              <div className="input_search">
                                 <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                                 <input value={value}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                                 <img className='clear'
                                    src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                                    alt="clear" onClick={() => setValue("")} />
                              </div>
                              <div className="songs_result">
                                 {
                                    all_songs?.length > 0 &&
                                    all_songs
                                       .filter((item: any) =>
                                          !playlist.some((playlistItem: any) => playlistItem.track_id === item.track_id) &&
                                          (item.track_title.toLowerCase().includes(value.toLowerCase().trim()) ||
                                             item.user_name.toLowerCase().includes(value.toLowerCase().trim()))
                                       )
                                       .map((item: any, index: number) => {
                                          return <Song isAdd={true} item={item}
                                             isAddDelete={true}
                                             playlist_id={playlist_id}
                                          />;
                                       })
                                 }
                              </div>
                           </div><section></section>

                           <div className="save" onClick={Save}>
                              Close
                           </div>
                        </div>
                     </div>
                  </Modal>)}
            </div>
         </div>
      </div>
   );
}

export default Playlist;
