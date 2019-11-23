import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './index.css'
import PostContainer from './PostContainer'
import LoginRegisterForm from './LoginRegisterForm'
import { Form, Message, Button } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
      loginCode: 200
    }
  }

  login = async loginInfo => {
    const res = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login',
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginRes = await res.json();
    if(parsedLoginRes.status.code === 200){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedLoginRes.data.email,
        loginCode: 200
      });
    } else {
      this.setState({
        loginCode: 401
      })
      console.log('login failed');
    }
  }

  register = async registerInfo => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/api/v1/users/register',
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const parsedRegisterRes = await res.json();
    // console.log(parsedRegisterRes);
    if(parsedRegisterRes.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUserEmail: parsedRegisterRes.data.email
      })
    } else {
      console.log('registration failed');
    }
  }
  logout = async () => {
    //this will let user logout from website
    const res = await fetch(
      process.env.REACT_APP_API_URL + '/api/v1/users/logout', 
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const parsedLogoutRes = await res.json();
    if(parsedLogoutRes.status.code === 200){
      this.setState({
        loggedIn: false
      })
    } else {
      console.log('logout failed');
    }
  }
  render() {
    return (
      <div className='App'>
        {this.state.loginCode === 401
          ?
          <Form error>
            <Message
              error
              header='Login Failed'
              content='Username or Password is incorrect'
            />
          </Form>
          :
          null
        }
      {this.state.loggedIn ?
        <Button onClick={this.logout} className='logout-button'>Logout</Button>
        :
        null
      }
        {this.state.loggedIn ? (
          <PostContainer />
          ) : (
            <LoginRegisterForm  login={this.login} register={this.register}/>
          )}
      </div>
    )
  }
}

export default App;
