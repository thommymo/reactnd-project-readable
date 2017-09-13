import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import {
  Container
} from 'semantic-ui-react'
import { fetchCategories, fetchPosts } from '../actions'


class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())

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

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(App);
