import {DoctorAction, DoctorActionTypes} from '../actions/doctorActions';
import {IDoctor} from '../../types';

const initState: IDoctor = {
  _id: 'random id',
  firstName: 'Doctor',
  lastName: 'Name',
  address: 'Somewhere i belong',
  holidays: [],
  phone: '0000000000',
};

function reducer(
  prevState: IDoctor = initState,
  action: DoctorAction,
): IDoctor {
  switch (action.type) {
    case DoctorActionTypes.SET_DOCTOR:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return prevState;
  }
}

export default reducer;
