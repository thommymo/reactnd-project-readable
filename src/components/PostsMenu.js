import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AddAndEditPost from './AddAndEditPost'


function PostsMenu (props) {
  return(
    <Menu size='small'>
      <Menu.Item>
        <AddAndEditPost content="Add Post" icon="plus"/>
      </Menu.Item>
      <Menu.Item  position='right'>
        <Menu.Menu>
          <Dropdown item text={props.categories.activeCategoryItem} icon='filter'>
            <Dropdown.Menu>
              <Dropdown.Item name='All categories' content='All categories' active={props.categories.activeCategoryItem === "All categories"} onClick={props.handleCategoryItemClick} />
              { props.categories.items.map((c) => (
                <Dropdown.Item key={c.name} name={c.name} content={c.name} active={c.name === props.categories.activeCategoryItem} onClick={props.handleCategoryItemClick}/>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Button.Group>
          <Button icon="sort numeric descending" name='timestamp' positive={props.posts.sortValue === "timestamp"} onClick={props.handleOrderByItemClick} size='mini' content='Date' />
          <Button.Or text='or' size='mini'/>
          <Button icon='sort numeric descending' name='voteScore' positive={props.posts.sortValue === "voteScore"} onClick={props.handleOrderByItemClick} size='mini' content='Vote'  />
        </Button.Group>
      </Menu.Item>
    </Menu>
  )
}

PostsMenu.propTypes = {
  categories: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  handleCategoryItemClick: PropTypes.func.isRequired,
  handleOrderByItemClick: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return {categories: store.categories, posts: store.posts }
}

export default connect(mapStateToProps)(PostsMenu)
