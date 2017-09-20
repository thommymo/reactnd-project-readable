import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import PostDetail from './PostDetail'
import {
  Container
} from 'semantic-ui-react'
import { fetchCategories, fetchPostsWithComments } from '../actions'
import { Route, withRouter } from 'react-router-dom';
import ErrorHandling from './ErrorHandling'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPostsWithComments())
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
      <Container>
        <ErrorHandling>
          <Route  path="/" exact component={Posts} />
          <Route  path="/:category" exact component={Posts} />
          <Route  path="/:category/:id" exact component={PostDetail}/>
        </ErrorHandling>
      </Container>
    );
  }
}

function mapStateToProps (store) {
  return store
}

//withRouter is needed if using connect
export default withRouter(connect(mapStateToProps)(App))
