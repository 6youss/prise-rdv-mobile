import {PatientActionTypes} from '../actions/patientActions';

export interface PatientAction {
  type: PatientActionTypes;
  payload: any;
}

export interface IPatientState {
  firstName: string;
  lastName: string;
}

const initState: IPatientState = {
  firstName: 'Flen',
  lastName: 'Benflen',
};

function reducer(
  prevState: IPatientState = initState,
  action: PatientAction,
): IPatientState {
  switch (action.type) {
    case 'SET_PATIENT_PROFILE':
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return prevState;
  }
}

export default reducer;
