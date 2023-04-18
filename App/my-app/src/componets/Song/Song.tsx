import React from 'react';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import "./Song.css"
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Modal from './../Modal/Modal';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
import { DeleteTrack, PlayMusic, PlayPause, StopPlay } from '../../redux/Song/CreateSong';
import { UpdateTrack, } from './../../redux/Song/CreateSong';
import { AddTrackInPlaylist, DeleteTrackInPlaylist, GetPlaylistsUserId } from './../../redux/Playlist/CreatePlaylist';
import { AddTrackInLibrary, DeleteTrackInLibrary, GetTrackinLibrary } from './../../redux/Library/CreateLibrary';


interface ISong {
   isAdd?: boolean,
   isAddDelete?: boolean,
   item?: any,
   songs_array?: any,
   style?: any,
   AddPlaylist?(data: any): void,
   DeletePlaylist?(data: any): void,
   playlist_id?: number | string,
}


const Song: FC<ISong> = ({ isAdd, item, songs_array, style, isAddDelete, playlist_id }) => {
   const { isAuth, user }: any = useAppSelector(state => state.user);
   const { genres, track_id, isPlay }: any = useAppSelector(state => state.song)
   const { library }: any = useAppSelector(state => state.library)
   const { playlists_users }: any = useAppSelector(state => state.playlist)

   const [menu, setMenu] = useState<boolean>(false);
   const [liked, setLiked] = useState<boolean>(false);
   const [add, setAdd] = useState<boolean>(true);
   const [modal, setModal] = useState<boolean>(false);
   const [plus, setPlus] = useState<boolean>(false);
   const [genre, setGenre] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [image, setImage] = useState<string | any>("");
   const [isPlayer, setPlay] = useState<boolean>()
   const [items, setItems] = useState<any>([])
   const [genres_arr, setGenres_arr] = useState<any[]>([]);
   const [your_track, setYourTrack] = useState<boolean>(false)

   const songRef = useRef<HTMLDivElement>(null);
   const downNavRef = useRef<HTMLDivElement>(null);
   const dotRef = useRef<HTMLImageElement>(null);


   useEffect(() => {
      setPlay(isPlay)
   }, [isPlay])


   useEffect(() => {
      if (library) {
         if (library.find((obj: any) => Number(obj.track_id) === Number(item.track_id))) {
            setLiked(true)
         } else {
            setLiked(false)
         }
      }
   }, [library, item])

   useEffect(() => {
      if (genres) {
         setGenres_arr(genres);
      }
   }, [genres])


   useEffect(() => {
      item?.track_id == track_id ? setPlay(true) : setPlay(false)
   }, [track_id])



   useEffect(() => {
      dispatch(GetTrackinLibrary(user?.user_id))
      dispatch(GetPlaylistsUserId(user?.user_id))
      if (item?.users.find((obj: any) => Number(obj.user_id) === Number(user?.user_id))) {
         setYourTrack(true)
      }
      else { setYourTrack(false) }

   }, [user])

   const dispatch = useAppDispatch();

   const changeModalState = (state: boolean) => {
      setModal(state);
   };
   const handleDotClick = () => {
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }
      setMenu(!menu);

      setAdd(true)

   };
   const ChangeModal = (state: boolean) => {
      setModal(state)
      if (state) {
         const index = genres_arr.findIndex((genre) => genre.genre_name === item?.genre_name) + 1;
         setGenre(index.toString())
         setName(item?.track_title)
      }
   }
   const DeleteTracks = (track_id: any) => {
      const data = {
         track_id: track_id,
         user_id: user?.user_id
      }
      dispatch(DeleteTrack(data))
   }

   const AddInPlayList = (song_id: string, id?: string) => {

      if (playlist_id) {
         const data = {
            playlist_id: playlist_id,
            song_id: song_id
         }
         dispatch(AddTrackInPlaylist(data))
      }
      else {
         const data = {
            playlist_id: id,
            song_id: song_id
         }

         dispatch(AddTrackInPlaylist(data))
      }
   }

   const DeleteTrackInPlaylists = (song_id: string) => {

      if (playlist_id) {
         const data = {
            playlist_id: playlist_id,
            song_id: song_id
         }
         dispatch(DeleteTrackInPlaylist(data));
      }
   }

   const handleClick = (event: any) => {
      if (
         songRef.current &&
         !songRef.current.contains(event.target) &&
         downNavRef.current &&
         !downNavRef.current.contains(event.target) &&
         dotRef.current &&
         !dotRef.current.contains(event.target)
      ) {
         setMenu(false);
         setAdd(true)
      }
   };

   const AddLibrary = (song_id: string) => {
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }
      const data = {
         song_id: song_id,
         user_id: user?.user_id
      }
      dispatch(AddTrackInLibrary(data))
   }

   const DeleteLibrary = (song_id: string) => {
      const data = {
         song_id: song_id,
         user_id: user?.user_id
      }
      dispatch(DeleteTrackInLibrary(data))

   }

   const UpdateTrackFunc = (track_id: any) => {

      const data = new FormData();
      data.append('user_id', user?.user_id);
      item?.track_title === name || name.length === 0 ? data.append('track_title', item?.track_title) : data.append('track_title', name);
      item?.genre_name === genre ? data.append('genre_name', item?.genre_name) : data.append('genre_name', genre);
      image ? data.append("track_image", image) : data.append("track_image", "");
      data.append("track_id", track_id);

      const form = {
         user_id: data.get("user_id"),
         track_title: data.get("track_title"),
         track_image: data.get("track_image"),
         genre_id: data.get("genre_id"),
         track_id: data.get("track_id")
      }

      dispatch(UpdateTrack(form))
      setModal(false)
   }

   useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
         document.removeEventListener("click", handleClick);
      };
   }, []);

   const stopSong = () => {
      dispatch(StopPlay());
   };

   const pauseSong = () => {
      dispatch(PlayPause());
   };

   const playSong = (item: any) => {
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }

      const data = {
         track: item,
         songs_array: songs_array
      }
      dispatch(PlayMusic(data))

   };

   return (
      <div ref={songRef} className="song" style={style && { order: style }}>
         <img
            className="play"
            src={
               !isPlay || track_id !== item?.track_id
                  ? process.env.PUBLIC_URL + '/icons/play.svg'
                  : process.env.PUBLIC_URL + '/icons/stop_song.svg'
            }
            onClick={() =>
               track_id === item?.track_id
                  ? isPlay
                     ? pauseSong()
                     : playSong(item)
                  : playSong(item)
            }
         />
         <div className="description" >
            <div className="artist">
               {item?.users?.map((el: any, index: number) => {

                  return (

                     <>
                        <Link to={`/user/executor/:${el.user_id}`} style={{ color: "grey" }}>{el?.user_name}</Link>
                        <span style={{ color: "gray" }}>
                           {index === item.users?.length - 1 ? "" : ","}
                        </span>
                     </>
                  );
               })}
            </div>

            <Link
               to={`/user/track/:${item?.track_id}`}
               className="name_song outside"
            >
               {item?.track_title}
            </Link>
         </div>
         {
            !isAdd ? (
               <div className="action">
                  {
                     !liked ? (
                        <img src={process.env.PUBLIC_URL + "/icons/heart.svg"}
                           onClick={() => AddLibrary(item?.track_id)}
                        />) : (
                        <img src={process.env.PUBLIC_URL + "/icons/full.svg"}
                           onClick={() => DeleteLibrary(item?.track_id)}

                        />

                     )

                  }
                  <img
                     ref={dotRef}
                     className="dot"
                     src={process.env.PUBLIC_URL + "/icons/dot.svg"}
                     alt="menu"
                     onClick={handleDotClick}
                  />
                  {menu && (

                     <div ref={downNavRef} className="menu">
                        {playlists_users?.length != 0 ? (
                           <>
                              <div className="btn" onClick={() => setAdd(!add)}>Add in playlist
                                 {
                                    !add && (<div className="add_list">
                                       <ul>
                                          {
                                             playlists_users?.map((el: any, index: number) => {
                                                return (
                                                   <li key={index} onClick={() => AddInPlayList(item?.track_id, el?.playlist_id)}>
                                                      {el?.title}
                                                   </li>
                                                )
                                             }
                                             )
                                          }
                                       </ul>
                                    </div>)
                                 }
                              </div>
                           </>
                        ) : (
                           <div style={{ textAlign: "center" }}>Not playlist</div>
                        )}


                        {
                           your_track && (
                              <> <div className="btn"
                                 onClick={() => ChangeModal(true)}
                              >Edit</div>
                                 <div className="btn" onClick={() => DeleteTracks(item?.track_id)}>Delete</div></>
                           )
                        }
                     </div>
                  )}
               </div>
            )
               : (
                  <div className="action">
                     {
                        isAddDelete ? (
                           <p className='plus' style={{
                              width: "100%", height: "100%"
                           }}  >
                              <button onClick={() => AddInPlayList(item?.track_id)}>Add</button>
                           </p>
                        ) : (
                           <p className='plus' style={{
                              width: "100%", height: "100%"
                           }}  >
                              <button style={{ background: "red" }}
                                 onClick={() => DeleteTrackInPlaylists(item?.track_id)}
                              >Del</button>
                           </p>
                        )
                     }

                  </div>
               )
         }
         {
            modal && (
               <Modal ChangeModal={changeModalState}>
                  <div className="modal_content">
                     <h1 className="title">Update track</h1>
                     <h2 className="name">Name</h2>
                     <input
                        type="text"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           setName(e.target.value)
                        }
                     />
                     <div className="block">
                        <div className="images">
                           {
                              image ?
                                 <img src={URL.createObjectURL(image)} alt="" />
                                 :
                                 <img src={item?.track_image} alt="" />
                           }
                           <button onClick={() => setImage(null)}>Cansel</button>
                        </div>
                        <>
                           <label htmlFor="photolabel">
                              <span>Image</span>
                              <img
                                 src={process.env.PUBLIC_URL + "/icons/download.svg"}
                                 alt=""
                              />
                           </label>
                           <input
                              type="file"
                              id={"photolabel"}
                              accept=".jpg, .jpeg, .png"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                 setImage(e.target.files![0])
                              }
                           />
                        </>
                     </div>
                     <div className="select">
                        <h2 className="name">Genre</h2>
                        <select
                           className="select"
                           value={genre}
                           onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                              setGenre(e.target.value)
                           }
                        >
                           {genres_arr?.map((item: any, index: number) => (
                              <option key={item?.genre_id} value={item?.genre_id}>
                                 {item?.genre_name}
                              </option>
                           ))
                           }
                        </select>
                     </div>
                     <div className="buttons">

                        <button className="submit" onClick={() => UpdateTrackFunc(item?.track_id)}>Submit</button>
                     </div>
                  </div>
               </Modal>
            )
         }
      </div>
   );
};


export default Song;
