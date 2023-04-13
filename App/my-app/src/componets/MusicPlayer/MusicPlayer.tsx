import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import { useAppDispatch } from '../../redux/store';
import { Next, PlayPause, Prev, StopPlay } from '../../redux/Song/CreateSong';
import { useAppSelector } from './../../redux/store';

interface Props {
   track?: any;
}

const MusicPlayer: React.FC<Props> = () => {
   const { currentSong, isPlay, isTrack }: any = useAppSelector(state => state.song)
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const dispatch = useAppDispatch();
   const audioRef: any = useRef<HTMLAudioElement | null>(null);


   const formatTime = (time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   };


   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.load();
      audio.play();
   }, [currentSong]);



   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (!isPlay) {
         audio.pause();
      } else {
         audio.play();
      }
      setIsPlaying(isPlay);

   }, [isPlay])

   const playPauseTrack = () => {

      dispatch(PlayPause());

   };


   const playNextTrack = () => {
      dispatch(Next())
      setIsPlaying(isPlay);
      setCurrentTime(0);
   };

   const playPrevTrack = () => {
      dispatch(Prev())
      setIsPlaying(isPlay);
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

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'ArrowLeft') {
            playPrevTrack();
         } else if (event.key === 'ArrowRight') {
            playNextTrack();
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

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
            src={currentSong?.track_content}
            onEnded={playNextTrack}
            onTimeUpdate={handleTimeUpdate}
         />
      </div>
   );
};

export default MusicPlayer;
