import React, { Component } from 'react';
import {
  Grid, Header, Label, Container
} from 'semantic-ui-react'
//import './App.css';

class Post extends Component {
  render() {
    
    const date = new Date(this.props.post.timestamp)
    const timestamp = new Intl.DateTimeFormat().format(date)

    return (

      <div className="Posts">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <Header as="h2">{this.props.post.title}</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <Container textAlign="right">
                  <Label color='blue' image>
                    VoteScore
                    <Label.Detail>

                      {this.props.post.voteScore}
                    </Label.Detail>
                  </Label>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Label color='grey' image>
                  {this.props.post.author}
                  <Label.Detail>


                    {timestamp}
                  </Label.Detail>
                </Label>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>{this.props.post.body}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}



export default (Post);
