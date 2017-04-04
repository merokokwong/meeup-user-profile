import {
    GET_USER,
    LOGIN_USER,
    CREATE_USER
} from '../actions/userActions.js'


const userState = (state = {
  result: null
}, action) => {

  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result
      });
      break;
    case LOGIN_USER:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result
      });
      break;
    case CREATE_USER:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result
      });
      break;

    default:
      return state
  }
}
export default userState;
