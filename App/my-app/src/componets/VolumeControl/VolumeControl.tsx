import React, { useState } from "react";
import "./VolumeControl.css";

interface VolumeControlProps {
   volume: number;
   onVolumeChange: (volume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
   volume,
   onVolumeChange,
}) => {
   const [isDragging, setIsDragging] = useState(false);

   const handleDragStart = () => {
      setIsDragging(true);
   };

   const handleDragEnd = () => {
      setIsDragging(false);
   };

   const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
         const rect = event.currentTarget.getBoundingClientRect();
         const offsetX = event.clientX - rect.left;
         const width = rect.width;
         const newVolume = Math.max(0, Math.min(1, offsetX / width));
         onVolumeChange(newVolume);
      }
   };

   const trackStyle = {
      width: `${volume * 100}%`,
   };

   return (
      <div className="volume-control">
         <div className="volume-control__track" onClick={handleDrag}>
            <div
               className="volume-control__track-fill"
               style={trackStyle}
               onMouseDown={handleDragStart}
               onMouseUp={handleDragEnd}
               onMouseLeave={handleDragEnd}
            />
         </div>
      </div>
   );
};

export default VolumeControl;
