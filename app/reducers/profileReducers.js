import {
    WRITE_DATA,
    GET_PROFILE,
} from '../actions/profileActions';


const profileState = (state = {
  result: null,
}, action) => {
  switch (action.type) {
    case WRITE_DATA:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result,
      });
      break;
    case GET_PROFILE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        result: action.result,
      });
      break;

    default:
      return state;
  }
};
export default profileState;
