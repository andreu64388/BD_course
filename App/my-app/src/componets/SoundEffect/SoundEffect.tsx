import React, { useState, useEffect } from "react";
import "./SoundEffect.css";
import { useAppSelector } from './../../redux/store';

const SoundEffect = () => {
   const [playing, setPlaying] = useState(false);
   const { isTrack }: any = useAppSelector(state => state.song);
   useEffect(() => {

      setPlaying(!isTrack)

   }, [isTrack]);



   return (
      <div className="block_lines">
         <div className={`line line-1${playing ? " playing" : ""}`}></div>
         <div className={`line line-2${playing ? " playing" : ""}`}></div>
         <div className={`line line-3${playing ? " playing" : ""}`}></div>

      </div>
   );
};

export default SoundEffect;
