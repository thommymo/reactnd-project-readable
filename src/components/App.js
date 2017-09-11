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
          <Header
            as='h1'
            content='These are Posts'
            textAlign='center'
          />
          <Posts />
        </Container>
      </div>
    );
  }
}

export default App;
