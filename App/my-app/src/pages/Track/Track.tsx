import React from 'react';
import { FC, useState } from 'react';
import "./Track.css"
import Song from '../../componets/Song/Song';
import { useEffect } from 'react';
import getDominantColor from './../../assets/Functioons/getDominantColor';
import { useAppDispatch } from '../../redux/store';
import { useAppSelector } from './../../redux/store';
import { ShowModal } from '../../redux/User/CreateUser';
import Modal from '../../componets/Modal/Modal';
import { useParams, Link } from 'react-router-dom';
import { getTrack } from '../../redux/Song/CreateSong';
import { AddRaiting } from './../../redux/Song/CreateSong';

const Track: FC = () => {

   const { song_id, user_tracks, index, raiting }: any = useAppSelector(state => state.song);
   const { isAuth, user, modal }: any = useAppSelector(state => state.user);

   const [backgroundColor, setBackgroundColor] = useState("");
   const [isPlay, setPlay] = useState<boolean>(false)
   const [modals, setModal] = useState<boolean>(false)
   const [estimate, setEstimate] = useState<boolean>(false)
   const [tar, setTar] = useState<any>(false)
   const [rating, setRating] = useState<number>(0);
   const [duration, setDuration] = useState<number | null | any>(null);

   const dispatch = useAppDispatch();
   const { track_id } = useParams();

   useEffect(() => {
      if (track_id) {
         dispatch(getTrack(track_id?.slice(1)))
      }
   }, [])

   useEffect(() => {
      dispatch(getTrack(track_id?.slice(1)))
      if (raiting?.find((obj: any) => Number(obj?.user_id) === Number(user?.user_id))) {
         setEstimate(false)
      }
      else {
         setEstimate(true)
      }
   }, [track_id])

   useEffect(() => {
      if (raiting?.find((obj: any) => Number(obj?.user_id) === Number(user?.user_id))) {
         setEstimate(false)
      }
      else {
         setEstimate(true)
      }
   }, [raiting])

   useEffect(() => {
      console.log(user_tracks)
      async function fetchDuration() {
         const duration = await getDuration(song_id?.track_content);
         setDuration(duration);
      }
      fetchDuration();
   }, [song_id]);


   const Estimate = () => {
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }
      setModal(!modals)

   }
   const getDuration = async (audioUrl: string): Promise<string> => {
      let audio = new Audio(audioUrl);
      return new Promise((resolve, reject) => {
         audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            if (isNaN(duration)) {
               reject('Invalid audio file');
            } else {
               const minutes = Math.floor(duration / 60);
               const seconds = Math.floor(duration % 60);
               const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
               resolve(formattedDuration);
            }
         });
         audio.addEventListener('error', () => {
            reject('Error loading audio file');
         });
      });
   };

   const AddRaitingTrack = () => {
      const data = {
         user_id: user?.user_id,
         track_id: track_id?.slice(1),
         rating: rating ? rating : 1,
      }
      dispatch(AddRaiting(data))
      setModal(false)
   }

   const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRating = parseInt(event.target.value);
      setRating(newRating);
   }

   const ChangeModal = (state: boolean) => {
      setModal(state)
   }

   const handleImageLoad = async (event: any) => {
      const image = event.target;
      const dominantColor = await getDominantColor(image);
      setBackgroundColor(dominantColor);
   }

   const PlayMusic = () => {
      if (!isAuth) {
         dispatch(ShowModal())
         return
      }
      setPlay(!isPlay)
   }

   const sortedUserTracks = [...user_tracks];
   const trackIndex = sortedUserTracks.findIndex((item) => item.track_id === song_id?.track_id);
   if (trackIndex !== -1) {
      const trackToMove = sortedUserTracks.splice(trackIndex, 1)[0];
      sortedUserTracks.unshift(trackToMove);
   }

   return (
      <div className='wrapper'>
         <div className="track">
            <div className="about_track"
               style={{ background: `${backgroundColor}` }}>
               <div className="image">
                  <img src={song_id?.track_image} onLoad={handleImageLoad} alt="Instasamka.svg" />
               </div>
               <div className="text">
                  <h1 className="name_track">
                     {song_id?.track_title}
                  </h1>
                  <div className="full_info">
                     {song_id?.users.map((el: any) => {
                        return (
                           <Link to={`/user/executor/:${el?.user_id}`}>
                              <img src={el?.user_img} alt="" />
                              <p> {el?.user_name}</p>
                           </Link>
                        )
                     })}
                     <div className="duraction">
                        {duration}
                     </div>
                     <div className="date">
                        {song_id?.track_date.slice(0, 10)}
                     </div>
                     <div className="rating">
                        {Number(song_id?.avg_rating)?.toFixed(2)}
                     </div>
                  </div>
               </div>
            </div>
            <div className="wrapper_all">
               <div className="players">
                  <div className="music_player" onClick={() => PlayMusic()}>
                     <img src={
                        !isPlay ? process.env.PUBLIC_URL + "/icons/Player.svg" :
                           process.env.PUBLIC_URL + "/icons/stop1.svg"
                     } alt=""
                     />

                  </div>
                  {
                     estimate && (<button className="estimate" onClick={() => Estimate()}>
                        Estimates
                     </button>)
                  }
               </div>
               <div className="musics">
                  {sortedUserTracks?.map((item: any, ind: number) => (
                     <Song

                        item={item}

                        songs_array={sortedUserTracks}

                     />
                  ))}
               </div>
            </div>
            {
               modals &&
               (<Modal ChangeModal={ChangeModal}>
                  <div className="modal_estimate">

                     <div className="title">
                        Estimate track
                     </div>
                     <div className="blocks">
                        {Array.from({ length: 10 }, (_, i) => (
                           <label key={i}>
                              <input
                                 type="radio"
                                 name="rating"
                                 value={i + 1}
                                 checked={rating === i + 1}
                                 onChange={handleRatingChange}
                              />
                              <span className="star">{i + 1}</span>
                           </label>
                        ))}

                     </div>
                     <button onClick={AddRaitingTrack}>
                        Estimate
                     </button>
                  </div>
               </Modal>)
            }
         </div>
      </div >
   );
}

export default Track;
