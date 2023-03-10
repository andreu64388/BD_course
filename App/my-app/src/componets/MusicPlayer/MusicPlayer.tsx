import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import { useAppDispatch } from '../../redux/store';
import { StopPlay } from '../../redux/Song/CreateSong';

interface Props {
   tracks: string[];
}

const MusicPlayer: React.FC<Props> = ({ tracks }) => {
   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);

   const dispatch = useAppDispatch();
   const audioRef: any = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      // Установка трека и воспроизведение
      audio.src = tracks[currentTrackIndex];
      audio.load();
      setIsPlaying(true);
      audio.play();
   }, [currentTrackIndex]);

   const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };

   const playPauseTrack = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
         setIsPlaying(false);
         audio.pause();


      } else {
         setIsPlaying(true);
         audio.play();
      }
      dispatch(StopPlay())
   };

   const playNextTrack = () => {
      const newIndex = currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
      setCurrentTime(0);
   };

   const playPrevTrack = () => {
      const newIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
      setCurrentTime(0);
   };

   const handleTimeUpdate = () => {
      const audio = audioRef.current;
      if (!audio) return;
      setCurrentTime(audio.currentTime);
   };

   const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio) return;
      const progressBar = event.currentTarget;
      const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
      const percent = clickPosition / progressBar.clientWidth;
      const newTime = percent * audio.duration;
      setCurrentTime(newTime);
      audio.currentTime = newTime;
   };


   return (
      <div className="music-player">
         <div className="music-player-controls">
            <button onClick={playPrevTrack}>
               <img src={process.env.PUBLIC_URL + "/icons/prev.svg"} alt="" />
            </button>
            <button onClick={playPauseTrack}>{isPlaying ? <img src={process.env.PUBLIC_URL + "/icons/stop.svg"} /> : <img src={process.env.PUBLIC_URL + "/icons/start.svg"} />}</button>
            <button onClick={playNextTrack}>
               <img src={process.env.PUBLIC_URL + "/icons/next.svg"} alt="" />
            </button>
         </div>
         <div className="music-player-progress" onClick={handleProgressClick}>
            <div className="music-player-progress-bar" style={{ width: `${(currentTime / audioRef?.current?.duration) * 100}%` }}>
               <div className="music-player-progress-circle" style={{ left: `${(currentTime / audioRef?.current?.duration) * 100}%` }}></div>
            </div>
         </div>
         <div className="music-player-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioRef.current?.duration || 0)}</span>
         </div>
         <audio
            ref={audioRef}
            src={tracks[currentTrackIndex]}
            onEnded={playNextTrack}
            onTimeUpdate={handleTimeUpdate}

         />
      </div>
   );
};




export default MusicPlayer;
