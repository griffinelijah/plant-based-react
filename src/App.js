import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PostContainer from './PostContainer'
import LoginRegisterForm from './LoginRegisterForm'



class App extends Component {
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      loggedInUserEmail: null
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
        loggedInUserEmail: parsedLoginRes.data.email
      });
    } else {
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
  render() {
    return (
      <div className='App'>
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
