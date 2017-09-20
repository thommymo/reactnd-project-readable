import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Post } from './Post'
import {
  Grid, Container, Button, Header, Menu, Divider, Segment
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AddandEditComment from './AddandEditComment'
import AddAndEditPost from './AddAndEditPost'
import DeletePost from './DeletePost'
import { Comment } from './Comment'

class PostDetail extends Component {

  getPost(){
    const post = this.props.posts.items.filter((post) => (post.id === this.props.match.params.id))
    return post[0]
  }
  
  getComments(){
    let comments = 0
    if (this.props.comments.items)
      comments = this.props.comments.items.filter((comment) => (comment.parentId === this.props.match.params.id))
    return comments
  }

  render() {
    const post = this.getPost()
    const comments = this.getComments()

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
          <Comment comment={comment} key={comment.id} />
        )) }
      </Container>
    );
  }
}

PostDetail.propTypes = {
  posts: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

function mapStateToProps (store) {
  return {posts: store.posts, comments: store.comments }
}

export default connect(mapStateToProps)(PostDetail);
