import React, { Component } from 'react';
import Posts from './Posts'
import {
  Container
} from 'semantic-ui-react'
import { getAllCategories } from '../utils/api'

//import './App.css';

class App extends Component {
// TODO: This should go into our Store
  state = {
      categories: []
  }
  componentDidMount() {
    getAllCategories().then((categories) => {
      this.setState({ categories })
    })
  }



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
