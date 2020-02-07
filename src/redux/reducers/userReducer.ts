import {UserActionTypes} from '../actions/userActions';

export interface UserAction {
  type: UserActionTypes;
  payload: any;
}

export interface IUserState {
  id: string;
  username: string;
  userType: 'patient' | 'doctor';
  accessToken: string | undefined;
}

const initState: IUserState = {
  id: 'khkh',
  username: 'patient',
  userType: 'patient',
  accessToken: 'accessToken that works',
};

function reducer(
  prevState: IUserState = initState,
  action: UserAction,
): IUserState {
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
