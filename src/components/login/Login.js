import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="login"/>
        <input type="password" placeholder="password"/>
      </div>
    );
  }
}