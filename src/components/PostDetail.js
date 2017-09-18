import React, { Component } from 'react';
import Post from './Post'
import {
  Grid, Container, Button, Header, Label, Menu, Divider, Segment
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchComments } from '../actions'
import VoteScore from './VoteScore'
import AddandEditComment from './AddandEditComment'
import AddAndEditPost from './AddAndEditPost'
import DeletePost from './DeletePost'
import DeleteComment from './DeleteComment'

class PostDetail extends Component {

  render() {
    //TODO: Move this into props. This does not make sense here. Instead turn this into a static componoent
    //TODO: Sort Comments DESC Date
    let post = this.props.posts.items.filter((post) => (post.id === this.props.match.params.id))
    post = post[0]

    let comments = 0
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
                  {post &&
                    <Button.Group>

                      <AddAndEditPost
                        content="Edit Post"
                        icon="edit"
                        postid={post.id}
                        body={post.body}
                        title={post.title}
                        author={post.author}
                        category={post.category}
                      />
                      <DeletePost postid={post.id}/>


                    </Button.Group>
                  }
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
                    <Header as="h2">{comments.length} Comment</Header>
                  }

                  {comments.length > 1 &&
                    <Header as="h2">{comments.length} Comments</Header>
                  }
                  { post &&
                    <AddandEditComment
                      parentId={post.id}
                      buttonContent="Add Comment"
                      content="Add"
                      color="grey"
                      icon="plus"
                    />
                  }
                </Divider>
              </Segment>

            </Grid.Column>
          </Grid.Row>
        </Grid>

        { comments && comments.map((comment) => (

          <Grid key={comment.id} padded >

            <Grid.Row >

              <Grid.Column width={8}>
                <Label image>
                  {comment.author}
                  { //Check if comment.timestamp is a date
                    Object.prototype.toString.call(new Date(comment.timestamp)) && isFinite(new Date(comment.timestamp)) &&
                    <Label.Detail>

                      { new Intl.DateTimeFormat().format(new Date(comment.timestamp)) }

                    </Label.Detail>
                  }
                </Label>
              </Grid.Column>
              <Grid.Column width={8}>
                <Container textAlign='right'>
                  <VoteScore voteScore={comment.voteScore} id={comment.id} posttype="comments" />
                  <Button.Group size='mini'>
                    <AddandEditComment
                      parentId={comment.parentId}
                      id={comment.id}
                      author={comment.author}
                      body={comment.body}
                      buttonContent="Edit"
                      content="Edit"
                      color="blue"
                      icon="edit"
                    />
                    <DeleteComment commentId={comment.id} parentId={comment.parentId}/>
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
