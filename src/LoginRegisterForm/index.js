import React, { Component } from 'react';
import { Form, Button, Label, Message } from 'semantic-ui-react';
import '../index.css'

class LoginRegisterForm extends Component {
	constructor(){
		super();
		this.state = {
			email: '',
			password: '',
			username: '',
			action: 'login'
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister();
	}
	loginRegister = (e) => {
		if(this.state.action === 'login') {
			this.props.login({
				email: this.state.email,
				password: this.state.password
			})
		} else {
			this.props.register({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			})
		}
	}
	switchForm = () => {
		if(this.state.action === 'login'){
			this.setState({
				action: 'register'
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}

	  render() {
    return (
      <div className="LoginRegisterForm">
        <Form onSubmit={this.handleSubmit}>
          {this.state.action === "register" ? (
            <React.Fragment>
              <Label>Username:</Label>
              <Form.Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </React.Fragment>
          ) : null}

          <Label>Email:</Label>
          <Form.Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Label>Password:</Label>
          <Form.Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button type="Submit">
            {this.state.action === "register" ? "Register" : "Login"}
          </Button>
        </Form>
        {this.state.action === "register" ? (
          <small>
            Already have an account? Log in{" "}
            <span onClick={this.switchForm}>here</span>
          </small>
        ) : (
          <small>
            Need an account? Sign up <span onClick={this.switchForm}>here</span>
            !
          </small>
        )}
      </div>
    );
  }
}


export default LoginRegisterForm





















