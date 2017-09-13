import { combineReducers } from 'redux'

import {
  ADD_POST,
  ADD_COMMENT_TO_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SORT_POSTS,
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
  sortValue: 'voteScore',
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
        items: action.posts.sort((a, b) => (a[state.sortValue]-b[state.sortValue]))

      })
    case SORT_POSTS:
      return Object.assign({}, state, {
        sortValue: action.sortCriteria,
        items: state.items.sort((a, b) => (a[action.sortCriteria]-b[action.sortCriteria]))
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
