import * as actionTypes from './actionTypes';
import * as actions from './actions';
import reducer from './reducer';

export default function createAll() {
  return {
    actionTypes,
    actions,
    reducer
  };
}
