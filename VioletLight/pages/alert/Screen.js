import React, { Component } from 'react';
import logo from './logo.svg';
import './Screen.css';
import SMSForm from './SMSForm';

class Screen extends Component {
  render() {
    return (
      <div className="Screen">
        <header className="Screebn-header">

          <SMSForm />
        </header>
      </div>
    );
  }
}

export default Screen;
