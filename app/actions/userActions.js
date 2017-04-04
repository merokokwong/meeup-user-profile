import firebaseRef from '../services/Firebase';

export const GET_USER = 'GET_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const CREATE_USER = 'CREATE_USER';

export function getUserStatus(status, result, error) {
  return {
    type: GET_USER,
    result,
    status,
    error,
  };
}
export function loginUserStatus(status, result, error) {
  return {
    type: LOGIN_USER,
    result,
    status,
    error,
  };
}
export function createUserStatus(status, result, error) {
  return {
    type: CREATE_USER,
    result,
    status,
    error,
  };
}

export function getUser() {
  return function (dispatch) {
    let user = firebaseRef.auth().currentUser;

    if (user === null) {
      dispatch(getUserStatus('LOGGED_OUT', null));

      firebaseRef.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(getUserStatus('LOGGED_IN', user));
        } else {
          dispatch(getUserStatus('LOGGED_OUT', null));
        }
      });
    } else {
      dispatch(getUserStatus('LOGGED_IN', user));
    }
  };
}

export function loginUser(email, password) {
  return function (dispatch) {
    firebaseRef.auth().signInWithEmailAndPassword(email, password).catch((err) => {
      dispatch(loginUserStatus('FAILED_LOGIN', null, err.message));
    });
    dispatch(loginUserStatus('SUCCCESS_LOGIN'));
  };
}
export function createUser(email, password) {
  return function (dispatch) {
    firebaseRef.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
      dispatch(createUserStatus('FAILED_CREATE_USER', null, err.message));
    });
    dispatch(createUserStatus('SUCCCESS_CREATE_USER'));
  };
}
