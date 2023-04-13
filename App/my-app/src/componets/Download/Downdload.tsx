import React from 'react';
import "./Download.css"

type Props = {
   trackUrl: string;
}

const DownloadButton: React.FC<Props> = ({ trackUrl }) => {
   const handleDownload = () => {
      window.open(trackUrl, '_blank');
   }

   return (
      <button onClick={handleDownload}>
         Скачать трек
      </button>
   );
}

export default DownloadButton;
