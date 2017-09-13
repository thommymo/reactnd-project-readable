import React, { Component } from 'react'
import { Grid, Menu, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Post from './Post'
import { sortPosts } from '../actions'

class Posts extends Component {

  /*
    TODO: Why is Ordering made with redux store and why is filtering made with state in this component? Is there any reason for that?
    * this needs a reason or refactoring has to be made
  */

  state = {
    activeCategoryItem: 'all categories',
  }

  handleCategoryItemClick = (e, { name }) => this.setState({ activeCategoryItem: name })

  handleOrderByItemClick = (e, { name }) => {
    this.props.dispatch(sortPosts(name))
  }

  render() {
    const { sortValue, sortOrder } = this.props.posts
    const { activeCategoryItem } = this.state
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={7}>
            <Button icon='plus' content='New Post' color='blue'/>
          </Grid.Column>
          <Grid.Column width={5}>
            <Container textAlign='right'>
              <Button.Group>
                <Button icon="sort numeric ascending" name='timestamp' positive={sortValue === "timestamp"} onClick={this.handleOrderByItemClick} size='mini' content='Date' />
                <Button.Or text='or' size='mini'/>
                <Button icon='sort numeric descending' name='voteScore' positive={sortValue === "voteScore"} onClick={this.handleOrderByItemClick} size='mini' content='Vote' />
              </Button.Group>
            </Container>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>

            { this.props.posts.items.filter((post) => (activeCategoryItem === "all categories" || post.category===activeCategoryItem)).map((post) => (
              <Post key={post.id} post={post}/>
            ))}

          </Grid.Column>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular='right'>
              <Menu.Item name='all categories' active={activeCategoryItem === "all categories"} onClick={this.handleCategoryItemClick} />

              { this.props.categories.items.map((category) => (
                <Menu.Item key={category.name} name={category.name} active={activeCategoryItem === category.name} onClick={this.handleCategoryItemClick} />
              ))}

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
