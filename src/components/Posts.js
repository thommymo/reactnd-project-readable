import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Post } from './Post'
import { sortPosts, updateCurrentCategory } from '../actions'
import PostsMenu from './PostsMenu'

class Posts extends Component {

  handleCategoryItemClick = (e, { name }) => {
    this.props.history.push( name )
    this.props.dispatch(updateCurrentCategory( name ))
  }

  handleOrderByItemClick = (e, { name }) => {
    this.props.dispatch(sortPosts(name))
  }

  componentDidMount(){
    const name = this.props.match.params.category
    if (name)
      this.props.dispatch(updateCurrentCategory( name ))
  }

  render() {
    const { activeCategoryItem } = this.props.categories

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <PostsMenu
              handleCategoryItemClick={this.handleCategoryItemClick}
              handleOrderByItemClick={this.handleOrderByItemClick}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>

            { this.props.posts.items.filter((post) => (activeCategoryItem === "All categories" || post.category===activeCategoryItem)).map((post) => (
              <Post key={post.id} post={post} comments={this.props.comments.items.filter((comment) => (comment.parentId === post.id))}/>
            )) }

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

Posts.propTypes = {
  categories: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return {categories: store.categories, posts: store.posts, comments: store.comments, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(Posts);
