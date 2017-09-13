import React, { Component } from 'react'
import { Grid, Menu, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
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
              <Button.Group  size='mini'>
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
              <Menu.Item name='all categories' active={activeItem === "all categories"} onClick={this.handleItemClick} />
              { this.props.categories.items.map((category) => (
                <Menu.Item key={category.name} name={category.name} active={activeItem === category.name} onClick={this.handleItemClick} />
              ))
              }
            </Menu>
          </Grid.Column>
        </Grid.Row>


      </Grid>


    );
  }
}

function mapStateToProps (store) {
  return {categories: store.categories}
}

export default connect(mapStateToProps)(Posts);
