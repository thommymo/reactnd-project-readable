import React, { Component } from 'react';
import Posts from './Posts'
import {
  Container, Header
} from 'semantic-ui-react'

//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Container text>
          <Posts />
        </Container>
      </div>
    );
  }
}

export default App;
