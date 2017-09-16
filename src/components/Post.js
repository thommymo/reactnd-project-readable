import React, { Component } from 'react';
import {
  Grid, Header, Label, Container
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
//import './App.css';

class Post extends Component {

  render() {
    
    //Check if timestamp generates a real date
    //TODO: Refactor this, so I can use it as "Stupid" Component
    let formattedDate = 0
    const date = new Date(this.props.post.timestamp)
    if(Object.prototype.toString.call(date) && isFinite(date))
      formattedDate = new Intl.DateTimeFormat().format(date)

    return (
      <div className="Posts">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                { this.props.id === undefined &&
                  <Link to={"/" + this.props.post.category + "/" + this.props.post.id}>
                    <Header as="h2">{this.props.post.title}</Header>
                  </Link>
                }
                { this.props.id !== undefined &&
                  <Header as="h2">{this.props.post.title}</Header>
                }
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
                    {formattedDate}
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
