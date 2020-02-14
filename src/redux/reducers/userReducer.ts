import {UserAction} from '../actions/userActions';
import {IUser} from '../../types';

const initState: IUser = {
  id: 'khkh',
  username: 'patient',
  userType: 'patient',
  accessToken: undefined,
};

function reducer(prevState: IUser = initState, action: UserAction): IUser {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        ...action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        accessToken: undefined,
      };
    default:
      return prevState;
  }
}

export default reducer;
