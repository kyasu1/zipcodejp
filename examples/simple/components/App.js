import React, { Component } from 'react';
import { add } from 'zipcodejp';

export default class App extends Component {
  render() {
    return (
      <p>
        2 + 2 = {add(2, 2)}
      </p>
    );
  }
}
