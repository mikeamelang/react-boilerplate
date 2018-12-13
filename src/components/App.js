import React, { Component } from "react";
import PropTypes from 'prop-types';

import '../styles/App.css';

// version 3

class OnlyEvens extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    console.log(nextProps);
    /* if ( nextProps.value % 2 == 0) {
    return true;
     } else {
       return false;
     }*/
     return true;
  }
  componentWillReceiveProps(nextProps) {
    console.log('Receiving new props...');
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    var myColor = ( this.props.value % 2 == 0) ? 'yellow' : 'blue';
    var myStyle = {
      color: myColor
    };
    return <h1 style={myStyle} >{this.props.value}</h1>
  }
}
OnlyEvens.propTypes = {
  value: PropTypes.string.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState({
      value: this.state.value + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value}/>
      </div>
    );
  }
}



export default App;
