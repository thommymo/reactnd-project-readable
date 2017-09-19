import React from 'react';
import PropTypes from 'prop-types'
import {
  Grid, Container, Button, Label, Divider
} from 'semantic-ui-react'
import VoteScore from './VoteScore'
import AddandEditComment from './AddandEditComment'
import DeleteComment from './DeleteComment'

export function Comment (props) {

    const comment = props.comment

    //Check if comment.timestamp is a date and format date
    let date = 0
    const dateFromTimestamp = new Date(comment.timestamp)
    if (Object.prototype.toString.call(dateFromTimestamp) && isFinite(dateFromTimestamp))
      date = Intl.DateTimeFormat().format(dateFromTimestamp)

    return (
      <Grid key={comment.id} padded >
        <Grid.Row >
          <Grid.Column width={8}>
            <Label image>
              {comment.author}
              <Label.Detail>
                {date}
              </Label.Detail>
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
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}
