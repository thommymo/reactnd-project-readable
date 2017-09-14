import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import PostDetail from './PostDetail'
import {
  Container
} from 'semantic-ui-react'
import { fetchCategories, fetchPosts } from '../actions'
import { Route } from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  render() {
    return (
        <Container>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/:category" component={Posts}/>
          <Route path="/:category/:id" component={PostDetail}/>
        </Container>
    );
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(App);
