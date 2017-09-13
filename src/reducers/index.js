import { combineReducers } from 'redux'

import {
  ADD_POST,
  ADD_COMMENT_TO_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions'

const initialCategoriesState = {
  isFetching: false,
  items: []
}

function categories (state = initialCategoriesState, action) {
  switch(action.type){
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categories
      })
    default:
      return state
  }
}

const initialPostsState = {
  isFetching: false,
  items: []
}

function posts (state = initialPostsState, action) {
  switch(action.type){
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})

// This could be my Design of the State Shape
// TODO: Comment this in the final app, or remove
const myShapeDesign = {
  categories: {
    isFetching: false,
    items: [
      {
        name: 'elifant',
        path: 'elifant'
      },
      {
        name: 'bello',
        path: 'bello'
      }
    ]
  },
  posts: {
      isFetching: false,
      items: []
  }
}
