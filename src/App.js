import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import { Provider } from "react-redux";
import store from "./Redux/store";


import RootApp from "./components/RootApp";
class App extends Component {
  render() {
      return (
        <Provider store={store}>
          <RootApp />
        </Provider>
      );
  
  }
}

export default App
