import React from 'react';
import PropTypes from 'prop-types'
import {
  Grid, Header, Label, Container, Divider
} from 'semantic-ui-react'
import VoteScore from './VoteScore'
import { Link } from 'react-router-dom'

export function Post(props){

  const post = props.post
  const comments = props.comments

  let date = 0
  const dateFromTimestamp = new Date(post.timestamp)
  if (Object.prototype.toString.call(dateFromTimestamp) && isFinite(dateFromTimestamp))
    date = Intl.DateTimeFormat().format(dateFromTimestamp)

  return (
    <div className="Posts">
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11}>
              { // Do only link the title in Post Overview page
                props.id === undefined &&
                <Link to={"/" + post.category + "/" + post.id}>
                  <Header as="h2">{post.title}</Header>
                </Link>
              }
              { props.id !== undefined &&
                <Header as="h2">{post.title}</Header>
              }
            </Grid.Column>
            <Grid.Column width={5}>
              <Container textAlign="right">
                <VoteScore voteScore={post.voteScore} id={post.id} posttype="posts"/>
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Label image>
                {post.author}
                <Label.Detail>
                  {date}
                </Label.Detail>
              </Label>
              {comments &&
                <Label>
                  {`${comments.length} comments`}
                </Label>
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {post.body}
              <Divider/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.string,
  post: PropTypes.object.isRequired,
  comments: PropTypes.array
}
