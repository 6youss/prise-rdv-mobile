import {IDoctor} from '../../types';

export enum DoctorActionTypes {
  SET_SEARCHED_DOCTOR = 'SET_SEARCHED_DOCTOR',
}

export interface DoctorAction {
  type: DoctorActionTypes;
  payload: any;
}

export function setSearchedDoctorAction(doctor: IDoctor): DoctorAction {
  return {
    type: DoctorActionTypes.SET_SEARCHED_DOCTOR,
    payload: doctor,
  };
}
