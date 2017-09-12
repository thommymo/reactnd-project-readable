import React, { Component } from 'react';
import {
  Grid, Header, Label, Container
} from 'semantic-ui-react'
//import './App.css';

class Post extends Component {
  render() {
    return (
      <div className="Posts">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <Header as="h2">Post.Title</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Container textAlign="right">
                  <Label color='blue' image>
                    VoteScore
                    <Label.Detail>
                      XX
                    </Label.Detail>
                  </Label>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Label color='grey' image>
                  Post.Author
                  <Label.Detail>Post.Date</Label.Detail>
                </Label>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>Post.Body.Excerpt()</Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Post;
