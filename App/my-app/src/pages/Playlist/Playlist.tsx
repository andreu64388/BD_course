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
import { SearchTracks } from './../../redux/Song/CreateSong';
import { GetTracksInPlaylist, DeletenPlaylist, UpdatePlaylistTitle, ResetPlaylist } from './../../redux/Playlist/CreatePlaylist';


const Playlist: FC = () => {

   const { tracks_search }: any = useAppSelector(state => state.song)
   const { user }: any = useAppSelector(state => state.user)
   const { tracks_in_playlist, title_playlist, user_id_playlist }: any = useAppSelector(state => state.playlist)


   const [edit, setEdit] = useState<boolean>(true)
   const [modal, setModal] = useState<boolean>(false)
   const [title, setTitle] = useState<string>(title_playlist);
   const [value, setValue] = useState<string>("");
   const [tracks, setTracks] = useState<any>([])
   const [playlist, setPlaylist] = useState<any>([]);

   const { playlist_id } = useParams();

   const dispatch = useAppDispatch();
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(GetTracksInPlaylist(playlist_id))
      return () => {
         dispatch(ResetPlaylist())
      }
   }, [])

   useEffect(() => {
      if (value) {
         dispatch(SearchTracks(value))
      }
   }, [value])

   useEffect(() => {
      if (Number(user_id_playlist) === Number(user?.user_id)) {
         setEdit(true)
      }
      else {
         setEdit(false)
      }
   }, [user, user_id_playlist])

   useEffect(() => {
      setTracks(tracks_search)
   }, [tracks_search])

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

      if (title === title_playlist) {
         setModal(false)
         return
      }
      if (title.length > 0) {
         const data = {
            playlist_id: playlist_id,
            title: title,
         }
         dispatch(UpdatePlaylistTitle(data))
         setModal(false)
      }

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
                        <button onClick={DeletePlaylistFunc} className='delete_btn'>
                           Delete
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
                              <button className='save' onClick={ChangeTitle}>
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
                                    tracks_search?.length > 0 &&
                                    tracks_search
                                       .filter((item: any) =>
                                          !playlist.some((playlistItem: any) => playlistItem.track_id === item.track_id))
                                       .map((item: any, index: number) => {
                                          return <Song isAdd={true} item={item}
                                             isAddDelete={true}
                                             playlist_id={playlist_id}
                                          />;
                                       })
                                 }
                              </div>
                           </div>
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
