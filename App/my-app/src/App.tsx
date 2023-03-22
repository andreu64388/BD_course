import { lazy, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./componets/Navbar/Navbar";
import Modal from "./componets/Modal/Modal";
import Player from './componets/Player/Player'
import { Provider } from "react-redux";
import store, { useAppDispatch, useAppSelector } from './redux/store';
import { GetMe, ResetModal } from "./redux/User/CreateUser";
import { GetGenres, GetSongs } from './redux/Song/CreateSong';


function App() {
  const { modal, token, user }: any = useAppSelector(state => state.user);
  const [state, setState] = useState<boolean>(modal);
  const [player, setPlayer] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetMe())
    dispatch(GetGenres())
    dispatch(GetSongs(user?.user_id))
  }, [])

  const Change = (val: boolean) => {
    setState(val)
    dispatch(ResetModal())
  }
  const ChangePlayer = (bool_val: boolean): void => {
    setPlayer(!bool_val)
  }

  useEffect(() => {
    Change(false)
  }, [location])
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
                  <Link to={"/user/register"} className="register" onClick={() => Change(false)}> Register</Link>
                </div>
                <p className="login">
                  Do you have account?
                  <Link
                    onClick={() => Change(false)}
                    to={"/user/login"}>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      }
      <Player ClosePlayer={ChangePlayer} player={player} />
    </div >

  );
}

export default App;
