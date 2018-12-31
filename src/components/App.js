import React from "react"; // , { Component }
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

//import '../styles/App.css';


// Redux:
const ADD = 'ADD';
const REMOVE = 'REMOVE';

const doAddMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const doRemoveMessage = (message) => {
  return {
    type: REMOVE,
    message: message
  }
};


const applyMessage = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    case REMOVE:
      return state.filter( msg => msg != action.message );
    default:
      return state;
  }
};

const store = createStore(applyMessage);

// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onAddMessage = this.onAddMessage.bind(this);
    this.onRemoveMessage = this.onRemoveMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  onAddMessage() {
    this.props.propAddMessage(this.state.input);
    this.setState({
      input: '',
    });
  }
  onRemoveMessage() {
    this.props.propRemoveMessage(this.state.input);
    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.onAddMessage}>Add</button>
        <button onClick={this.onRemoveMessage}>Remove</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
Presentational.propTypes = {
  messages: PropTypes.array.isRequired,
  propAddMessage: PropTypes.func.isRequired,
  propRemoveMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    propAddMessage: (message) => {
      dispatch(doAddMessage(message))
    },
    propRemoveMessage: (message) => {
      dispatch(doRemoveMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
}


export default App;
