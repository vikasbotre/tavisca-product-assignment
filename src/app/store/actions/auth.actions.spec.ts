import {
  SignUpSuccess,
  SignUpFailure,
  LogInSuccess,
  LogInFailure,
  LogOut,
} from './auth.actions';
import { AuthActionTypes, LogIn, SignUp } from './auth.actions';

const mockUser = {
  email: 'vikasbotre1992@gmail.com',
  password: 'vikas1234',
};

describe('LogIn', () => {
  it('should create an action of type LogIn', () => {
    const action = new LogIn(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN);
  });
});
describe('SignUp', () => {
  it('should create an action of type SignUp', () => {
    const action = new SignUp(mockUser);
    expect(action.type).toEqual(AuthActionTypes.SIGNUP);
  });
});
describe('LogOut', () => {
  it('should create an action of type LogOut', () => {
    const action = new LogOut();
    expect(action.type).toEqual(AuthActionTypes.LOGOUT);
  });
});
describe('SignUpSuccess', () => {
  it('should create an action of type SignUp Success', () => {
    const action = new SignUpSuccess(mockUser);
    expect(action.type).toEqual(AuthActionTypes.SIGNUP_SUCCESS);
  });
});
describe('LogInSuccess', () => {
  it('should create an action of type Login Success', () => {
    const action = new LogInSuccess(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_SUCCESS);
  });
});
describe('SignUpFailure', () => {
  it('should create an action of type SignUp Failure', () => {
    const action = new SignUpFailure(mockUser);
    expect(action.type).toEqual(AuthActionTypes.SIGNUP_FAILURE);
  });
});
describe('LogInFailure', () => {
  it('should create an action of type Login Failure', () => {
    const action = new LogInFailure(mockUser);
    expect(action.type).toEqual(AuthActionTypes.LOGIN_FAILURE);
  });
});
