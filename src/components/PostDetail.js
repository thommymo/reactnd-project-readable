import React, { Component } from 'react';
import Post from './Post'
import {
  Grid, Container, Button, Header, Label, Menu, Divider, Segment, Modal, Icon
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions'
import VoteScore from './VoteScore'
import AddComment from './AddComment'
//import './App.css';

class PostDetail extends Component {

  componentDidMount(){
    this.props.dispatch(fetchComments(this.props.match.params.id))
  }

  render() {
    let post = this.props.posts.items.filter((post) => (post.id === this.props.match.params.id))
    post = post[0]

    let comments = false
    if (this.props.comments.items)
      comments = this.props.comments.items.filter((comment) => (comment.parentId === this.props.match.params.id))

    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={16}>
              <Menu size='small'>

                <Menu.Item>
                  <Link to='/'><Button icon='arrow left' content='All Posts' color='grey' /></Link>
                </Menu.Item>

                <Menu.Item  position='right'>
                  <Button.Group>
                    <Button icon="edit" name='timestamp' color='blue' size='mini' content='Edit' />
                    <Button icon='delete' name='voteScore' color='red' size='mini' content='Delete' />
                  </Button.Group>
                </Menu.Item>



              </Menu>

            </Grid.Column>
            <Grid.Column width={5}>
              <Container textAlign='right'>

              </Container>
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              {
                // Check if there is a post
                post &&
                <Post key={post.id} post={post} id={this.props.match.params.id}/>
              }
            </Grid.Column>

          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Segment attached>
                <Divider horizontal >


                  {comments.length === 0 &&
                    <Header as="h2">No Comments yet</Header>
                  }
                  {comments.length === 1 &&
                    <Header as="h2">{this.props.comments.items.length} Comment</Header>
                  }

                  {comments.length > 1 &&
                    <Header as="h2">{this.props.comments.items.length} Comments</Header>
                  }
                  { post &&
                    <AddComment postid={post.id} />
                  }
                </Divider>
              </Segment>

            </Grid.Column>
            <Grid.Column width={8}>
              <Container textAlign='right'>

              </Container>


            </Grid.Column>
          </Grid.Row>
        </Grid>

        { comments && comments.map((comment) => (

          <Grid key={comment.id} padded >

            <Grid.Row >

              <Grid.Column width={8}>
                <Label color='grey' image>
                  {comment.author}
                  <Label.Detail>
                    {comment.timestamp}
                  </Label.Detail>
                </Label>
              </Grid.Column>
              <Grid.Column width={8}>
                <Container textAlign='right'>
                  <VoteScore voteScore={comment.voteScore} postid={comment.id} />
                  <Button.Group size='mini'>
                    <Button icon="edit" name='timestamp' color='blue' content='Edit' />
                    <Button icon='delete' name='voteScore' color='red' content='Delete' />
                  </Button.Group>
                </Container>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>

                <p>{comment.body}</p>
                <Divider/>
              </Grid.Column>


            </Grid.Row>
          </Grid>

        )) }

      </Container>
    );
  }
}

function mapStateToProps (store) {
  return {posts: store.posts, comments: store.comments, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(PostDetail);
