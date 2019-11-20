import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostContainer from './PostContainer'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="App">
        <PostContainer />
      </div>
    )
  }
}

export default App;
