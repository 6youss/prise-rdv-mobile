import {IPatient} from '../../types';
import {PatientAction} from '../actions/patientActions';

const initState: IPatient = {
  firstName: 'Flen',
  lastName: 'Benflen',
};

function reducer(
  prevState: IPatient = initState,
  action: PatientAction,
): IPatient {
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
