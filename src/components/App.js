import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import PostDetail from './PostDetail'
import {
  Container
} from 'semantic-ui-react'
import { fetchCategories, fetchPosts } from '../actions'
import { Route, withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  render() {
    return (
      <Container>
        { /*
          TODO: Unfortunately a change in the URL does not lead to a rerender of the DOM, but I do not know why?
          One of the main diffrences between this App.js and the reactnd-project-myreads-starter is that
          there is a render function which is called in the Route. But adding a render function needs
          the refactoring of the this.props.match.param variable. Since this.props.match seems to be undefined...
          */
        }
        { /*
          TODO: From Time to time I should fetch new Posts, since somebody else could have updated the posts in
          the Database. If I do not fetch posts or comments from time to time, this user
          will never see new items.
          Now it might be good to fetch only posts, which are new or have been updated.
          */
        }
        <Route  path="/" exact component={Posts} />
        <Route  path="/:category" exact component={Posts} />
        <Route  path="/:category/:id" exact component={PostDetail} />
      </Container>
    );
  }
}

function mapStateToProps (store) {
  return store
}

//withRouter is needed if using connect
export default withRouter(connect(mapStateToProps)(App))
