import React, { Component } from 'react';
import './Screen.css';
import SMSForm from './SMSForm';

class Screen extends Component {
  render() {
    return (
      <div className="Screen">
        <header className="Screen-header">
          <SMSForm />
        </header>
      </div>
    );
  }
}

export default Screen;
