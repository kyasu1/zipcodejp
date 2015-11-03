import Immutable from 'immutable';
import { REQUEST, SUCCESS, FAILURE, RESET } from './actionTypes';

const initialState = new Immutable.Map({
  requesting: false,
  success: false,
  failure: false,
  address: {}
});

export default function redcuer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return state.merge({
        requesting: true,
        success: false,
        failure: false,
        address: {}
      });
    case SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        failure: false,
        address: action.data
      });
    case FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        failure: true,
        address: {}
      });
    case RESET:
      return state.merge({
        requesting: false,
        success: false,
        failure: false,
        address: {}
      });
    default:
      return state;
  }
}
