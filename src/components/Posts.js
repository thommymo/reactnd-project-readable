import React, { Component } from 'react'
import { Grid, Menu, Segment, Dropdown, Button, Container } from 'semantic-ui-react'
import Post from './Post'

class Posts extends Component {
  state = { activeItem: 'all categories' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={8}>
            <Button icon='plus' content='New Post' color='blue'/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Container textAlign='right'>
              <Button.Group  size='mini' position="right">
                <Button size='mini'>Date</Button>
                <Button.Or text='or' size='mini'/>
                <Button positive  size='mini'>Votes</Button>
              </Button.Group>
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>

          <Grid.Column width={12}>
            <Post />
            <Post />
            <Post />
          </Grid.Column>

          <Grid.Column width={4}>
            <Menu fluid vertical tabular='right'>
              <Menu.Item name='all categories' active={activeItem === 'all categories'} onClick={this.handleItemClick} />
              <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
              <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
              <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
            </Menu>
          </Grid.Column>
        </Grid.Row>


      </Grid>


    );
  }
}

export default Posts;
