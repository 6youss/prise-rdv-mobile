import {IUserState} from './userReducer';

export interface RootState {
  user: IUserState;
}

export {default as user} from './userReducer';
