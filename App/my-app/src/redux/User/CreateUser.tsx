import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { IStateUser } from './ICreateUser';
import { IUser } from './../../Interface/User';


const initialState: IStateUser = {
   isAuth: false,
   user: null,
   admin: false,
   token: null,
   modal: false,
   loading: false,
   message: null,

};

export const RegisterUser = createAsyncThunk(
   "user/register",
   async (formData: any) => {
      try {
         console.log(formData);
         const onUploudsProgress = (progressEvent: any) => {
            console.log(
               "Upload Progress: " +
               Math.round((progressEvent.loaded * 100) / progressEvent.total) +
               "%"
            );
         };
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },

            onUploadProgress: onUploudsProgress,
         };
         const { data } = await axios.post("/user/register", formData, config);

         if (data.token) {
            window.localStorage.setItem("token", data.token);
         }

         return data;
      } catch (error) {
         console.log(error);
      }
   }
);

export const LoginUser = createAsyncThunk(
   "user/login",
   async (userData: { user_email: string, user_password: string }) => {
      try {
         const { data } = await axios.post("/user/login", userData);
         if (data.token) {
            window.localStorage.setItem("token", data.token);
         }
         console.log(data);
         return data;
      }
      catch (err) {
         console.log(err)
      }
   }

);


export const GetMe = createAsyncThunk("user/getme",
   async () => {
      try {
         const { data } = await axios.get("/user/getme");
         if (data.token) {
            window.localStorage.setItem("token", data.token);
         }
         console.log(data);


         return data;
      } catch (error) {
         console.log(error);
      }
   });


export const UpdateUser = createAsyncThunk(
   "user/update",
   async (formData: any) => {
      try {

         const onUploudsProgress = (progressEvent: any) => {
            console.log(
               "Upload Progress: " +
               Math.round((progressEvent.loaded * 100) / progressEvent.total) +
               "%"
            );
         };
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            onUploadProgress: onUploudsProgress,
         };

         const { data } = await axios.post("/user/upload_user", formData, config);


         if (data.token) {
            window.localStorage.setItem("token", data.token);
         } console.log(data);

         return data;
      } catch (error) {
         console.log(error);
      }
   }
);


export const UpdateUserPassword = createAsyncThunk(
   "user/Updatepassworfd",
   async (datas: any) => {
      try {
         const { data } = await axios.post("/user/update/password",
            {
               user_id: datas.user_id,
               user_password: datas.user_password,
            });
         console.log(data);

         if (data.token) {
            window.localStorage.setItem("token", data.token);
         }

         return data;
      } catch (error) {
         console.log(error);
      }
   }
);
export const userSlice: any = createSlice({
   name: "user",
   initialState,
   reducers: {
      Logout(state) {
         state.isAuth = false;
         state.user = null;
         state.admin = false;
         state.token = null;
         state.modal = false;
         state.loading = false;
         state.message = null;
         window.localStorage.removeItem("token");
      },
      ResetModal(state) {
         state.modal = false;
      },
      ShowModal(state) {
         state.modal = true;
      }

   }  //spline polygon() mesh(сетка разные )
   ,
   extraReducers: (builder) => {
      builder.addCase(RegisterUser.pending, (state: any, action: any) => {
         state.loading = true;

      });
      builder.addCase(RegisterUser.fulfilled, (state, action) => {

         state.loading = false;
         state.isAuth = true;
         state.user = action.payload?.user;
         state.token = action.payload?.token;
         if (action.payload.user.role_name === "admin")
            state.admin = true;
         else {
            state.admin = false;
         }

      });
      builder.addCase(RegisterUser.rejected, (state: any, action: any) => {
         state.loading = false;
         alert(state.loading)
         state.message = action.payload.message;
      });
      builder.addCase(LoginUser.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(LoginUser.fulfilled, (state: any, action: any) => {
         state.loading = false;
         state.isAuth = true;
         state.user = action?.payload.user || null;
         state.token = action?.payload.token;
         if (action.payload.user.role_name === "admin")
            state.admin = true;
         else {
            state.admin = false;
         }
      });
      builder.addCase(LoginUser.rejected, (state: any, action: any) => {
         state.loading = false;
         state.message = action.payload.message;
      });
      builder.addCase(GetMe.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(GetMe.fulfilled, (state: any, action: any) => {
         state.loading = false;
         state.isAuth = true;
         state.user = action?.payload.user || null;
         state.token = action?.payload.token;
         if (action.payload.user.role_name === "admin")
            state.admin = true;
         else {
            state.admin = false;
         }
      });
      builder.addCase(GetMe.rejected, (state: any, action: any) => {
         state.loading = false;
         state.message = action?.payload.message;
      });

      builder.addCase(UpdateUser.pending, (state: any) => {
         state.loading = true;
      });
      builder.addCase(UpdateUser.fulfilled, (state: any, action: any) => {

         state.loading = false;
         state.isAuth = true;
         state.user = action?.payload.user || null;
         state.token = action?.payload.token;

      })
      builder.addCase(UpdateUser.rejected, (state: any, action: any) => {
         state.loading = false;
         state.message = action?.payload.message;
      })
      builder.addCase(UpdateUserPassword.pending, (state: any) => {
         state.loading = true;
      });
      builder.addCase(UpdateUserPassword.fulfilled, (state: any, action: any) => {
         state.loading = false;
         state.isAuth = true;
         state.user = action?.payload.user || null;
         state.token = action?.payload.token;
      })
      builder.addCase(UpdateUserPassword.rejected, (state: any, action: any) => {
         state.loading = false;
         state.message = action?.payload.message;
      })






   },
});

export const { Logout, ResetModal, ShowModal } = userSlice.actions;
export default userSlice.reducer;