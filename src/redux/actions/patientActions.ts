import {IPatient} from '../../types';

export enum PatientActionTypes {
  SET_PATIENT_PROFILE = 'SET_PATIENT_PROFILE',
}
export interface PatientAction {
  type: PatientActionTypes;
  payload: any;
}

export function setPatientProfileAction(
  patientProfile: IPatient,
): PatientAction {
  return {
    type: PatientActionTypes.SET_PATIENT_PROFILE,
    payload: patientProfile,
  };
}
