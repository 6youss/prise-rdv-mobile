import {IUser, IPatient, IDoctor} from '../../types';

export interface RootState {
  user: IUser;
  patient: IPatient;
  doctor: IDoctor;
}
export {default as user} from './userReducer';
export {default as patient} from './patientReducer';
export {default as doctor} from './doctorReducer';
