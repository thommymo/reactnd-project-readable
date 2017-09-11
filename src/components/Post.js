import React, { Component } from 'react';
import {
  Grid, Divider, Header, Label
} from 'semantic-ui-react'
//import './App.css';

class Post extends Component {
  render() {
    return (
      <div className="Posts">
        <Divider section horizontal>Celled Grid</Divider>
        <Grid padded>
          <Grid.Row color="grey">
            <Grid.Column width={12}>
              <Header as="h2">Post.Title</Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Label color='blue' ribbon='right'>
                VoteScore:
                <Label.Detail>
                  XX
                </Label.Detail>
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row color="grey">
            <Grid.Column width={16}>
              <Label color='grey' image>
                Post.Author
                <Label.Detail>Post.Date</Label.Detail>
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row color="grey">
            <Grid.Column width={16}>Post.Body.Excerpt()</Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    );
  }
}

export default Post;
