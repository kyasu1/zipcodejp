'use strict';

exports.__esModule = true;
exports['default'] = redcuer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actionTypes = require('./actionTypes');

var initialState = new _immutable2['default'].Map({
  requesting: false,
  success: false,
  failure: false,
  address: {}
});

function redcuer(state, action) {
  if (state === undefined) state = initialState;

  switch (action.type) {
    case _actionTypes.REQUEST:
      return state.merge({
        requesting: true,
        success: false,
        failure: false,
        address: {}
      });
    case _actionTypes.SUCCESS:
      return state.merge({
        requesting: false,
        success: true,
        failure: false,
        address: action.data
      });
    case _actionTypes.FAILURE:
      return state.merge({
        requesting: false,
        success: false,
        failure: true,
        address: action.data
      });
    case _actionTypes.RESET:
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

module.exports = exports['default'];