import ReactDOM from "react-dom/client";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Library from "./pages/Library/Library";
import PageAddTrack from "./pages/PageAddTrack/PageAddTrack";
import Settings from "./pages/Settings/Settings";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Track from "./pages/Track/Track";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Executor from "./pages/Executor/Executor";
import Playlist from "./pages/Playlist/Playlist";
import EditProfile from "./pages/EditProfile/EditProfile";
import Password from "./pages/Password/Password";
import "../src/style/reset.css";
import "../src/style/index.css";
import AdminDashboard from './pages/ADashboard/ADashboard';
import AdminUsers from './pages/AUsers/AUsers';
import AdminSongs from './pages/ASongs/ASongs';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}> <App /></Provider>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user/search",
        element: <Search />,
      },
      {
        path: "/user/library",
        element: <Library />,
      },
      {
        path: "/user/add_track",
        element: <PageAddTrack />,
      },
      {
        path: "/user/settings",
        element: <Settings />,
      },
      {
        path: "/user/register",
        element: <Register />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/user/track/:track_id",
        element: <Track />,
      },
      {
        path: "/user/executor/:executor_id",
        element: <Executor />,
      },
      {
        path: "/user/playlist/:playlist_id",
        element: <Playlist />,
      },
      {
        path: "/user/edit",
        element: <EditProfile />,
      },
      {
        path: "/user/password",
        element: <Password />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/songs",
        element: <AdminSongs />,
      },

    ],
  },
]);
root.render(
  <RouterProvider router={router} />

);

reportWebVitals();
