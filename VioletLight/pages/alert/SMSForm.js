import React, { Component } from 'react';
import './SMSForm.css'

class SMSForm extends Component {
    onHandleChange(event) {
      console.log("on onhadlechange")
        const name = event.target.getAttribute('name');
        console.log(name);
        this.setState({
          message: { ...this.state.message, [name]: event.target.value }
        });
    }
    onSubmit(event) {
      console.log("On onSubmit")
        event.preventDefault();
        console.log("before default");
        console.log(this.state);

        this.setState({ submitting: true });

        console.log("After default");
        console.log(this.state);

        fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.message),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                error: false,
                submitting: false,
                message: {
                  to: '',
                  body: ''
                }
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
          })
          // .then(data=> console.log(data.message));
          console.log("After fetch")
      }


    constructor(props) {
      console.log("on costruct")
        super(props);
        this.state = {
          message: {
            to: '',
            body: ''
          },
          submitting: false,
          error: false
        };
        console.log(this.state);
        console.log("before onHandle");
        this.onHandleChange = this.onHandleChange.bind(this);
        console.log("before onSubmit");
        this.onSubmit=this.onSubmit.bind(this);
      }
      render() {
        return (
            <form
            onSubmit={this.onSubmit}
            className={this.state.error ? 'error sms-form' : 'sms-form'}
        >
            <div>
              <label htmlFor="to">To:</label>
              <input
                type="tel"
                name="to"
                id="to"
                value={this.state.message.to}
                onChange={this.onHandleChange}
              />
            </div>
            <div>
              <label htmlFor="body">Body:</label>
              <textarea
                name="body"
                id="body"
                value={this.state.message.body}
                onChange={this.onHandleChange}
              />
            </div>
            <button type="submit" disabled={this.state.submitting}>
            Send message
            </button>
          </form>
        );
      }
}
export default SMSForm;