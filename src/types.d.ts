export interface IDoctor {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  holidays: [Date];
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
export interface RootState {
  user: IUser;
  patient: IPatient;
}
