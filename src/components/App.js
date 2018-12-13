import React, { Component } from "react";

import '../styles/App.css';

// version 1

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout( () => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active User: { this.state.activeUsers
        }</h1>
      </div>
    );
  }
}



export default App;
