import React from 'react';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import "./User.css"
interface IUser {
   item?: any,
   Add?(data: any): void,
   Delete?(data: any): void,
   add_user?: boolean

}
const User: FC<IUser> = ({ item, add_user, Delete, Add }) => {
   const { isAuth, user }: any = useAppSelector(state => state.user);
   const { library, playlists_users, genres }: any = useAppSelector(state => state.song)
   const [items, setItems] = useState<any>([])
   const [add, setAdd] = useState<boolean>(false);


   useEffect(() => {
      setAdd(add_user || false)
   }, [add_user])

   const AddUser = (el: any) => {
      if (Add) {
         Add(el)
      }
   }

   const DeleteUser = (user_id: string) => {
      if (Delete) {
         Delete(user_id)
      }
   }

   return (
      <div className="user" >
         <p>
            {item?.user_name}  {item?.user_id}
         </p>
         <div className="action">
            {
               add ? (
                  <p className='plus' style={{
                     width: "100%", height: "100%"
                  }}  >
                     <button onClick={() => AddUser(item)}>Add</button>
                  </p>
               ) : (
                  <p className='plus' style={{
                     width: "100%", height: "100%"
                  }}  >
                     <button
                        style={{ background: "red" }}
                        onClick={() => DeleteUser((item?.user_id))}
                     >Del</button>
                  </p>
               )
            }
         </div>
      </div>
   )
};


export default User;
