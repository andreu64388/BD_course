import React from 'react';
import { FC, useState, ChangeEvent, useEffect } from 'react';
import "./Library.css"
import Song from '../../componets/Song/Song';
import Modal from '../../componets/Modal/Modal';
import Tabulation from './../../componets/Tab/Tab';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { SearchTracks } from './../../redux/Song/CreateSong';
import { CreatePlayList } from '../../redux/Playlist/CreatePlaylist';
import { GetPlaylistsUserId } from './../../redux/Playlist/CreatePlaylist';
import { GetTrackinLibrary } from './../../redux/Library/CreateLibrary';
import { Link } from 'react-router-dom';


const Library: FC = () => {
   const { tracks_search }: any = useAppSelector(state => state.song)
   const { library }: any = useAppSelector(state => state.library)
   const { user, isAuth }: any = useAppSelector(state => state.user)
   const { playlists_users }: any = useAppSelector(state => state.playlist)

   const [value, setValue] = useState<string>("");
   const [librarys, setLibrarys] = useState<any>([]);
   const [moddal, setModal] = useState<boolean>(false);
   const [title, setTitle] = useState<string>("");
   const [tracks, setTracks] = useState<any>([])
   const [playlist, setPlaylist] = useState<any>([]);

   const dispatch = useAppDispatch();

   useEffect(() => {
      if (user) {
         dispatch(GetPlaylistsUserId(user?.user_id))
         dispatch(GetTrackinLibrary(user?.user_id))
      }
   }, [])

   useEffect(() => {
      if (value) {
         dispatch(SearchTracks(value))
      }
   }, [value])

   useEffect(() => {

      dispatch(GetPlaylistsUserId(user?.user_id))
      dispatch(GetTrackinLibrary(user?.user_id))

   }, [user])

   useEffect(() => {
      setTracks(tracks_search)
   }, [tracks_search])

   useEffect(() => {
      if (library) {
         setLibrarys(library)
         console.log(library + "тут")
      }
   }, [library])

   useEffect(() => {
      if (playlists_users) {
         setPlaylist(playlists_users)
      }
   }, [playlists_users])

   const ChangeModal = (state: boolean) => {
      setModal(state)
   }

   const CreatePlaylist = () => {
      const data = {
         user_id: user?.user_id,
         playlist_name: title
      }
      dispatch(CreatePlayList(data));
      setModal(false)
   }

   return (
      <div className='wrapper'>
         <div className="wrapper_all">
            <div className="library">
               {isAuth ? (
                  <>  <div className="input_search">
                     <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="" />
                     <input value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                     <img className='clear'
                        src={process.env.PUBLIC_URL + "/icons/cansel.svg"}
                        alt="clear" onClick={() => setValue("")} />
                  </div>
                     <div className="my_list">
                        <Tabulation tabs={[
                           {
                              title: "Songs",
                           },
                           {
                              title: "Playlist",
                           }
                        ]} >
                           <div className="songs">
                              <h1 className="title">
                                 Songs
                              </h1>
                              <div className="songs_array">
                                 {Array?.isArray(librarys) && librarys?.filter((item: any) => {
                                    const regex = new RegExp(value, "gi");
                                    return regex.test(item.users.map((user: any) => user.user_name)) || regex.test(item.track_title);
                                 }).reverse().map((item: any, index: number) => {
                                    return (
                                       <Song
                                          item={item} songs_array={librarys}
                                       />
                                    );
                                 })}

                              </div>
                           </div>
                           <div className="playlist">
                              <h1 className="title">
                                 Playlist
                              </h1>
                              <button className='add'
                                 onClick={() => ChangeModal(true)}
                              >
                                 Add
                              </button>
                              <div className="ifnotsearch">
                                 {playlist && Array?.isArray(playlist) && playlist?.filter((el: any) => {
                                    const regex = new RegExp(value, "gi");
                                    return regex.test(el.title);
                                 }).map((el: any, index: any) => {

                                    return (
                                       <Link to={`/user/playlist/${el.playlist_id}`} key={index}>
                                          <div className="block_event">
                                             <h1 className="title">
                                                {el.title}
                                             </h1>
                                          </div>
                                       </Link>
                                    );
                                 })}
                              </div>
                           </div>
                        </Tabulation>
                     </div>
                     {moddal &&
                        (<Modal ChangeModal={ChangeModal}>
                           <div className="modal_content_change">
                              <h1 className="title">
                                 Add playlist
                              </h1>
                              <div className="blocks">
                                 <div className="block">
                                    <h2 className="enter_value">
                                       Title
                                    </h2>
                                    <input
                                       type="text"
                                       title={title}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                                       placeholder='Andrey...' />
                                 </div>
                                 <div className="save" onClick={CreatePlaylist}>
                                    Save
                                 </div>
                              </div>
                           </div>
                        </Modal>)}</>
               )
                  :
                  (<>
                     <div className='auth'>
                        <h1>
                           You are not authorized

                        </h1>
                        <Link to={'/user/login'} >
                           Login
                        </Link>
                     </div>
                  </>)
               }

            </div>
         </div>
      </div >
   );
}

export default Library;
