export enum UserActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}
export interface UserAction {
  type: UserActionTypes;
  payload: any;
}

export function signInAction(payload: any): UserAction {
  return {
    type: UserActionTypes.SIGN_IN,
    payload,
  };
}
