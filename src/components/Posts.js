import React, { Component } from 'react';
import {
  Grid, Divider, Header, Label
} from 'semantic-ui-react'
//import './App.css';
const InlineStyle = () => (
  <style>{`


    @media only screen and (max-width: 768px) {
      .stackable.grid:before {
        width: 100%;
        left: 0em;
      }
    }
  `}</style>
)

class Posts extends Component {
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
              <Label as='a' color='grey' image>
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

export default Posts;
