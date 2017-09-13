import React, { Component } from 'react'
import { Grid, Menu, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Post from './Post'
import { sortPosts } from '../actions'

class Posts extends Component {
  state = {
    activeCategoryItem: 'all categories',
    activeOrderByItem: 'voteScore'
  }

  handleCategoryItemClick = (e, { name }) => this.setState({ activeCategoryItem: name })

  handleOrderByItemClick = (e, { name }) => {
    this.props.dispatch(sortPosts(name))
    this.setState({ activeOrderByItem: name })
  }

  render() {
    const { activeCategoryItem, activeOrderByItem } = this.state
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={8}>
            <Button icon='plus' content='New Post' color='blue'/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Container textAlign='right'>
              <Button.Group  size='mini'>
                <Button name='timestamp' positive={activeOrderByItem === "timestamp"} onClick={this.handleOrderByItemClick} size='mini'>Date</Button>
                <Button.Or text='or' size='mini'/>
                <Button name='voteScore' positive={activeOrderByItem === "voteScore"} onClick={this.handleOrderByItemClick} size='mini'>Votes</Button>
              </Button.Group>
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>

          <Grid.Column width={12}>
            { this.props.posts.items.map((post) => (
              <Post
                key={post.id}
                post={post}
              />
            ))
            }

          </Grid.Column>

          <Grid.Column width={4}>
            <Menu fluid vertical tabular='right'>
              <Menu.Item name='all categories' active={activeCategoryItem === "all categories"} onClick={this.handleCategoryItemClick} />
              { this.props.categories.items.map((category) => (
                <Menu.Item key={category.name} name={category.name} active={activeCategoryItem === category.name} onClick={this.handleCategoryItemClick} />
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
  return {categories: store.categories, posts: store.posts, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(Posts);
