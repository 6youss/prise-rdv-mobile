declare module '*.jpg';
declare module '*.png';

export interface IDoctor {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  holidays: Array<Date>;
}

export interface IPatient {
  firstName: string;
  lastName: string;
}
export interface IUserProfile {
  patient: IPatient;
  doctor: IDoctor;
}

export interface IUser {
  id: string;
  username: string;
  userType: 'patient' | 'doctor';
  accessToken: string | undefined;
}

export {RootStackParamList} from './Router';
export {RootState} from './redux/reducers/index';
