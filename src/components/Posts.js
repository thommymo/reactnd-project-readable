import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Menu, Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Post } from './Post'
import { sortPosts } from '../actions'
import AddAndEditPost from './AddAndEditPost'

class Posts extends Component {

  /*
    TODO: Why is Ordering made with redux store and why is filtering made with state in this component? Is there any specific reason for that?
    * this needs a reason or refactoring has to be made
  */

  state = {
    activeCategoryItem: 'All categories'
  }

  handleCategoryItemClick = (e, { name }) => {
    this.props.history.push( name )
    this.setState({activeCategoryItem: name})
  }

  handleOrderByItemClick = (e, { name }) => {
    this.props.dispatch(sortPosts(name))
  }

  componentDidMount(){
    if(this.props.match.params.category)
      this.setState({activeCategoryItem: this.props.match.params.category})
  }

  render() {

    const { sortValue } = this.props.posts
    const { activeCategoryItem } = this.state

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Menu size='small'>

              <Menu.Item>
                <AddAndEditPost content="Add Post" icon="plus"/>
              </Menu.Item>
              <Menu.Item  position='right'>
                <Menu.Menu>

                  <Dropdown item text={activeCategoryItem} icon='filter'>
                    <Dropdown.Menu>
                      <Dropdown.Item name='All categories' content='All categories' active={activeCategoryItem === "All categories"} onClick={this.handleCategoryItemClick} />

                      { this.props.categories.items.map((c) => (
                        <Dropdown.Item key={c.name} name={c.name} content={c.name} active={c.name === activeCategoryItem} onClick={this.handleCategoryItemClick}/>
                      ))}

                    </Dropdown.Menu>
                  </Dropdown>

                </Menu.Menu>
              </Menu.Item>
              <Menu.Item>
                <Button.Group>
                  <Button icon="sort numeric descending" name='timestamp' positive={sortValue === "timestamp"} onClick={this.handleOrderByItemClick} size='mini' content='Date' />
                  <Button.Or text='or' size='mini'/>
                  <Button icon='sort numeric descending' name='voteScore' positive={sortValue === "voteScore"} onClick={this.handleOrderByItemClick} size='mini' content='Vote'  />
                </Button.Group>
              </Menu.Item>



            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>

            {
              // TODO: Maybe it's better to Listen to the category param from react-router-dom
            }

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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return {categories: store.categories, posts: store.posts, comments: store.comments, dispatch: store.dispatch }
}

export default connect(mapStateToProps)(Posts);
