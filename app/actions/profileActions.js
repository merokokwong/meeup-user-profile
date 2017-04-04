import firebaseRef from '../services/Firebase';

export const WRITE_DATA = 'WRITE_DATA';
export const GET_PROFILE = 'GET_PROFILE';

export function getProfileStatus(status, result, error) {
  return {
    type: GET_PROFILE,
    result,
    status,
    error,
  };
}

export function writeDataStatus(status, result, error) {
  return {
    type: WRITE_DATA,
    result,
    status,
    error,
  };
}

export function getProfile() {
  return function (dispatch) {
    const user = firebaseRef.auth().currentUser;
    const database = firebaseRef.database();
    if (user) {
      const userId = user.uid;
      database.ref(`/users/${userId}`).once('value').then((snapshot) => {
        const result = snapshot.val();
        dispatch(getProfileStatus('GET_PROFILE_SUCCESS', result));
      });
    } else {
      dispatch(getProfileStatus('GET_PROFILE_FAIL', null));
    }
  };
}

export function writeData(firstName, lastName, email, company, department, jobPosition) {
  return function (dispatch) {
    const user = firebaseRef.auth().currentUser;
    const database = firebaseRef.database();
    if (user) {
      const userId = user.uid;
      database.ref(`users/${userId}`).set({
        firstName,
        lastName,
        email,
        company,
        department,
        jobPosition,
      });
      dispatch(writeDataStatus('WRITE_SUCCESS'));
    } else {
      dispatch(writeDataStatus('WRITE_FAIL', null));
    }
  };
}
