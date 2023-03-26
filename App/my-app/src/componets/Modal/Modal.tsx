import React from 'react';
import { FC } from 'react';
import "./Modal.css"

interface IModal {
   ChangeModal: (modal: boolean) => void;
   children: React.ReactNode,

}
const Modal: FC<IModal> = ({ ChangeModal, children }
) => {
   return (
      <div className="modal">
         <div className="close" onClick={() => ChangeModal(false)}>
            <img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" />
         </div>
         {children}
      </div>
   );
}

export default Modal;
