import React, { Component } from 'react';
import Post from './Post'
import {
  Grid, Container
} from 'semantic-ui-react'
import { connect } from 'react-redux'
//import './App.css';

class PostDetail extends Component {


  render() {
    let post = this.props.posts.items.filter((post) => (post.id === this.props.match.params.id))
    post = post[0]

    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={12}>
              { post &&
                <Post key={post.id} post={post} id={this.props.match.params.id}/>
              }
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps (store) {
  return {posts: store.posts, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(PostDetail);
