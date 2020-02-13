import {DoctorAction, DoctorActionTypes} from '../actions/doctorActions';
import {IDoctor} from '../../types';

const initState: IDoctor = {
  firstName: 'Flen',
  lastName: 'Benflen',
  address: 'Elhih kodam lakhor hadak',
  holidays: [],
  phone: '0000000000',
};

function reducer(
  prevState: IDoctor = initState,
  action: DoctorAction,
): IDoctor {
  switch (action.type) {
    case DoctorActionTypes.SET_SEARCHED_DOCTOR:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return prevState;
  }
}

export default reducer;
