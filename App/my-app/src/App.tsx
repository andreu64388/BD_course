import { lazy, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./componets/Navbar/Navbar";
import Modal from "./componets/Modal/Modal";
import Player from './componets/Player/Player'
import { Provider } from "react-redux";
import store, { useAppDispatch, useAppSelector } from './redux/store';
import { ResetModal } from "./redux/User/CreateUser";

function App() {
  const { modal }: any = useAppSelector(state => state.user);
  const [state, setState] = useState<boolean>(modal);
  const [player, setPlayer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const Change = (val: boolean) => {
    setState(val)
    dispatch(ResetModal())
  }
  const ChangePlayer = (bool_val: boolean): void => {
    setPlayer(!bool_val)
  }
  return (

    <div className="app">

      <Navbar />
      <Outlet />
      {
        modal &&
        <Modal ChangeModal={Change}>
          <div className="content">
            <div className="blocks">
              <div className="img">
                <img src={process.env.PUBLIC_URL + "/icons/modal.svg"} alt="" />
              </div>
              <div className="text">
                <div className="block_one">
                  <h1 className="title">
                    Listen the music
                  </h1>
                  <a href="" className="register">Register</a>
                </div>
                <p className="login">
                  Do you have account? <a href="">Login</a>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      }
    
        <Player ClosePlayer={ChangePlayer} player={player} />
      
    </div>

  );
}

export default App;
