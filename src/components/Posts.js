import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Post from './Post'

class Posts extends Component {
  render() {
    return (
      <div className="Posts">
        <Post />
        <Post />
        <Post />
      </div>
    );
  }
}

export default Posts;
