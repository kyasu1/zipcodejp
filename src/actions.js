// import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { REQUEST, SUCCESS, FAILURE, RESET } from './actionTypes';

const GOOGLE_API_KEY = '';

function checkStatus(response) {
  if (response.status < 200 && response.status >= 300) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function request() {
  return {
    type: REQUEST,
    data: {}
  };
}

function success(address) {
  const data = {
    prefecture: address[1].long_name,
    city: address[2].long_name,
    street: address.slice(3, -1).reduce((p, c) => p.long_name + c.long_name, {long_name: ''})
  };
  return {
    type: SUCCESS,
    data: data
  };
}

function failure() {
  const data = {
    prefecture: 'エラー',
    city: 'エラー',
    street: 'エラー'
  };
  return {
    type: FAILURE,
    data: data,
    error: '送信エラー：しばらくしてからやり直してください'
  };
}

export function reset() {
  return {
    type: RESET,
    data: {}
  };
}

export function zipGeocode(zip) {
  const zipcode = zip.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  return dispatch => {
    dispatch(request());
    return fetch(`https://maps.google.com/maps/api/geocode/json?address=${zipcode}&language=ja&sensor=false&key=${GOOGLE_API_KEY}`)
    .then(checkStatus)
    .then(res => res.json())
    .then(json => {
      const address = json.results[0].address_components.reverse();
      if (address[0].short_name !== 'JP') {
        dispatch(failure());
      } else {
        dispatch(success(address));
      }
    })
    .catch(() => {
      dispatch(failure());
    });
  };
}
