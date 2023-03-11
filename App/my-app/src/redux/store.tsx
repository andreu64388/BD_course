import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./User/CreateUser";
import songSlice from './Song/CreateSong';
import adminSlice from './Admin/CreateAdmin';



const store = configureStore({
   reducer: {
      user: userSlice,
      song: songSlice,
      admin: adminSlice
   },
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;