import {IDoctor, RootState} from '../types';

export function doctorSelector(store: RootState): IDoctor {
  return store.doctor;
}
export function patientSelector(store: RootState): IDoctor {
  return store.doctor;
}
