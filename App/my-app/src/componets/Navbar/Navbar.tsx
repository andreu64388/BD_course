import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FC } from "react";
import "./Navbar.css";
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { Logout } from "../../redux/User/CreateUser";
import { ClosePlay } from "../../redux/Song/CreateSong";

const items1 = [
   {
      id: 1,
      title: "Home",
      path: "/",
      icon: "/icons/home.svg",
   },
   {
      id: 2,
      title: "Search",
      path: "/user/search",
      icon: "/icons/search.svg",
   },
   {
      id: 3,
      title: "Your Library",
      path: "/user/library",
      icon: "/icons/library.svg",
   },
   {
      id: 4,
      title: "Add a track",
      path: "/user/add_track",
      icon: "/icons/add.svg",
   },
];

const items2 = [
   {
      id: 1,
      title: "Profile",
      path: "/user/profile",
      icon: "/icons/userprofile.svg",
   },
   {
      id: 2,
      title: "Edit",
      path: "/user/edit",
      icon: "/icons/edit.svg",
   },
   {
      id: 3,
      title: "Password",
      path: "/user/password",
      icon: "/icons/pass.svg",
   },

];

const admins = [
   {
      id: 1,
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: "/icons/home.svg",
   },
   {
      id: 2,
      title: "Users",
      path: "/admin/users",
      icon: "/icons/Auser.svg",
   },
   {
      id: 3,
      title: "Songs",
      path: "/admin/songs",
      icon: "/icons/library.svg",
   },

];

const Navbar: FC = () => {
   const location = useLocation();
   const isRegister = location.pathname === "/user/register";
   const isLogin = location.pathname === "/user/login";
   const isProfile = location.pathname === "/user/profile";
   const isEdit = location.pathname === "/user/edit";
   const isPass = location.pathname === "/user/password";

   const [elements, setElements] = useState<any[]>();
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const dispacth = useAppDispatch();
   const { isAuth, admin, user }: any = useAppSelector(state => state.user);

   useEffect(() => {
      function handleClickOutside(event: any) {
         const downNav = document.querySelector(".down_nav");
         const names = document.querySelector(".name");
         if (
            downNav &&
            !downNav.contains(event.target) &&
            !names?.contains(event.target)
         ) {
            setIsOpen(false);
         }
      }

      document.addEventListener("click", handleClickOutside);
      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);


   useEffect(() => {
      if (admin && isAuth) {
         setElements(admins);
      }
      else {
         if (isProfile || isPass || isEdit) {
            setElements(items2);
         }
         else {
            setElements(items1);
         }
      }
      setIsOpen(false);
   }, [location])


   useEffect(() => {
      if (admin) {
         alert("admin")
         setElements(admins)
      }
   }, [admin])

   const LogoutUser = () => {
      dispacth(Logout());
      dispacth(ClosePlay())
   }
   return (
      <>
         {!isRegister && !isLogin ? (
            <div className="navbar_user">
               <nav className="navbar">
                  <div className="logo">
                     {
                        !admin ? (<Link to={"/"}>
                           <img src={process.env.PUBLIC_URL + "/icons/logoG.svg"} alt="" />
                        </Link>) : (<Link to={"/admin/dashboard"}
                           style={{ fontSize: "25px" }}
                        >Admin panel </Link>)
                     }
                  </div>
                  <ul>
                     {elements?.map((item: any) => (
                        <NavLink
                           key={item.id}
                           to={item.path}
                           style={({ isActive }) =>
                              isActive ? { color: "white" } : { color: "gray" }
                           }
                        >
                           <li>
                              <img src={process.env.PUBLIC_URL + item.icon} alt={item.icon} />
                              <p>{item.title}</p>

                           </li>
                        </NavLink>
                     ))}
                  </ul>
               </nav>
               <nav className="up_nav">
                  {!isAuth ? (
                     <div className="output">
                        <Link to={"/user/register"} className="register">Register</Link>
                        <Link to={"/user/login"} className="login">Login</Link>
                     </div>
                  ) : (
                     <div className="nav_profile">
                        <div className="circle">
                           <img
                              src={process.env.PUBLIC_URL + "/icons/user.svg"}
                              alt="profile"
                           />
                        </div>
                        <div className="name" onClick={() => setIsOpen(!isOpen)}>
                           <span>{user?.user_name}</span>
                           <img
                              className={isOpen ? "polygon open" : "polygon"}
                              src={process.env.PUBLIC_URL + "/icons/Polygon.svg"}
                              alt="polygon"
                           />
                        </div>
                        <nav className={isOpen ? "down_nav open" : "down_nav"}>
                           <ul>
                              {!admin && (
                                 <>
                                    <li>
                                       <Link onClick={() => {
                                          setIsOpen(false)
                                       }
                                       } to={"/user/profile"}>Profile</Link>
                                    </li>
                                    <li>
                                       <Link onClick={() => {
                                          setIsOpen(false)

                                       }} to={"/user/settings"}>Settings</Link>
                                    </li>
                                    <div className="line"></div>
                                 </>
                              )}
                              <li>
                                 <Link onClick={LogoutUser} to={"/user/login"}>Exit</Link>
                              </li>
                           </ul>
                        </nav>
                     </div>
                  )}
               </nav >
            </div >
         ) :
            (<div className="navbar_user">
               <nav className="up_nav">
                  <Link to={"/"} className="logo">
                     <img src={process.env.PUBLIC_URL + "/icons/logoG.svg"} alt="" />
                  </Link>
               </nav>
            </div>)}
      </>
   );
};

export default Navbar;
