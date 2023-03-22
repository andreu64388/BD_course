import { IUser } from "../../Interface/User";

export interface IStateUser {
  isAuth: boolean;
  user: IUser | null;
  admin: boolean;
  token: string | null;
  modal: boolean;
  loading: boolean;
  message: string | null;
}
