import {IDoctor, RootState, IPatient} from '../types';

export function doctorSelector(store: RootState): IDoctor {
  return store.doctor;
}
export function patientSelector(store: RootState): IPatient {
  return store.patient;
}

export function tokenSelector(store: RootState): string | undefined {
  return store.user.accessToken;
}
