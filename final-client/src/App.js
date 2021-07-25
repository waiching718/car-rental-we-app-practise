import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header";

class App extends Component{
  render() {
    return(
        <>
            <Header style={{padding: '10px'}}/>
          {this.props.children}
        </>
    );
  }
}

export default App;
