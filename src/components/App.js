import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import {
  Container, Button
} from 'semantic-ui-react'


class App extends Component {

  render() {
    return (
      <div>
        <Container text>
          <Posts />
          <Button onClick={this.props.addCategory}>Test</Button>
        </Container>
      </div>
    );
  }
}

function mapStateToProps (store) {
  return store
}

export default connect(mapStateToProps)(App);
