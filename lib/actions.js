// import Promise from 'es6-promise';
'use strict';

exports.__esModule = true;
exports.reset = reset;
exports.zipGeocode = zipGeocode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _actionTypes = require('./actionTypes');

var GOOGLE_API_KEY = '';

function checkStatus(response) {
  if (response.status < 200 && response.status >= 300) {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function request() {
  return {
    type: _actionTypes.REQUEST,
    data: {}
  };
}

function success(address) {
  var data = {
    prefecture: address[1].long_name,
    city: address[2].long_name,
    street: address.slice(3, -1).reduce(function (p, c) {
      return p.long_name + c.long_name;
    }, { long_name: '' })
  };
  return {
    type: _actionTypes.SUCCESS,
    data: data
  };
}

function failure() {
  var data = {
    prefecture: 'エラー',
    city: 'エラー',
    street: 'エラー'
  };
  return {
    type: _actionTypes.FAILURE,
    data: data,
    error: '送信エラー：しばらくしてからやり直してください'
  };
}

function reset() {
  return {
    type: _actionTypes.RESET,
    data: {}
  };
}

function zipGeocode(zip) {
  var zipcode = zip.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  return function (dispatch) {
    dispatch(request());
    return _isomorphicFetch2['default']('https://maps.google.com/maps/api/geocode/json?address=' + zipcode + '&language=ja&sensor=false&key=' + GOOGLE_API_KEY).then(checkStatus).then(function (res) {
      return res.json();
    }).then(function (json) {
      var address = json.results[0].address_components.reverse();
      if (address[0].short_name !== 'JP') {
        dispatch(failure());
      } else {
        dispatch(success(address));
      }
    })['catch'](function () {
      dispatch(failure());
    });
  };
}