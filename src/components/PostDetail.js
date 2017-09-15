import React, { Component } from 'react';
import Post from './Post'
import {
  Grid, Container, Button, Header, Label
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions'
//import './App.css';

class PostDetail extends Component {

  componentDidMount(){
    console.log(this.props.match.params.id);
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  render() {
    let post = this.props.posts.items.filter((post) => (post.id === this.props.match.params.id))
    post = post[0]

    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={7}>
              <Link to='/'><Button icon='arrow left' content='All Posts' color='grey' /></Link>
            </Grid.Column>
            <Grid.Column width={5}>
              <Container textAlign='right'>
                <Button.Group>
                  <Button icon="edit" name='timestamp' color='blue' size='mini' content='Edit' />
                  <Button icon='delete' name='voteScore' color='red' size='mini' content='Delete' />
                </Button.Group>
              </Container>
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={12}>
              {
                // Check if there is a post
                post &&
                <Post key={post.id} post={post} id={this.props.match.params.id}/>
              }
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={12}>
            <Header as="h2">Comments</Header>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
          { post.comments!==undefined && post.comments.map((comment) => (
            <Container key={comment.id}>
              <Grid.Row>
                <Grid.Column width={7}>
                  <Label color='grey' image>
                    {comment.author}
                    <Label.Detail>
                      {comment.timestamp}
                    </Label.Detail>
                  </Label>
                  <Label color='blue' image>
                    VoteScore
                    <Label.Detail>
                      {comment.voteScore}
                    </Label.Detail>
                  </Label>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Container textAlign="right">

                  </Container>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <p>{comment.body}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>

              </Grid.Row>
            </Container>

          )) }
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps (store) {
  return {posts: store.posts, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(PostDetail);
