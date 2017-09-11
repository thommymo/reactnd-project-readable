import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Post from './Post'

class Posts extends Component {
  state = { activeItem: 'all categories' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Grid padded>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular='left'>
            <Menu.Item name='all categories' active={activeItem === 'all categories'} onClick={this.handleItemClick} />
            <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
            <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
            <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12} color="pink">
          <Post />
          <Post />
          <Post />
        </Grid.Column>


      </Grid>


    );
  }
}

export default Posts;
