import { combineReducers } from 'redux'

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SORT_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  CHANGE_VOTE_SCORE,
  UPDATE_EDITED_COMMENT,
  ADD_NEW_COMMENT,
  REMOVE_COMMENT,
  REMOVE_POST,
  ADD_POST,
  UPDATE_EDITED_POST,
  UPDATE_CURRENT_CATEGORY
} from '../actions'

const initialCategoriesState = {
  isFetching: false,
  items: [],
  activeCategoryItem: "All categories"
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
    case UPDATE_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        activeCategoryItem: action.activeCategoryItem
      })
    case ADD_POST:
      return Object.assign({}, state, {
        activeCategoryItem: initialCategoriesState.activeCategoryItem
      })
    default:
      return state
  }
}

const initialPostsState = {
  isFetching: false,
  isFetchingComments: false,
  sortValue: 'voteScore',
  items: []
}

function posts (state = initialPostsState, action) {
  switch(action.type){
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CHANGE_VOTE_SCORE:
      const index = state.items.findIndex((post => post.id === action.id))
      if (index>-1) {
        if(action.value === "upVote")
          state.items[index].voteScore+=1
        else if (action.value === "downVote")
          state.items[index].voteScore-=1
        return Object.assign({}, state, {
          items: state.items
        })
      } else {
        return state
      }
    case ADD_POST:
      const sortValue = "timestamp"
      return Object.assign({}, state, {
        items: state.items.concat(action.post).sort((a, b) => (b[sortValue]-a[sortValue])),
        sortValue: sortValue
      })
    case REMOVE_POST:
      return Object.assign({}, state, {
        items: state.items.filter((post) => (post.id !== action.post.id))
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts.sort((a, b) => (b[state.sortValue]-a[state.sortValue]))
      })
    case UPDATE_EDITED_POST:
      const newitems = state.items.filter((post) => (post.id !== action.post.id))
      return Object.assign({}, state, {
        isFetching: false,
        items: newitems.concat(action.post).sort((a, b) => (b[state.sortValue]-a[state.sortValue]))
      })
    case SORT_POSTS:
      return Object.assign({}, state, {
        sortValue: action.sortValue,
        items: state.items.sort((a, b) => (b[action.sortValue]-a[action.sortValue]))
      })
    default:
      return state
  }
}
const initialCommentsState = {
  isFetching: false,
  items: []
}

function comments (state = initialCommentsState, action) {
  switch(action.type){
    case CHANGE_VOTE_SCORE:
      const index = state.items.findIndex((comment => comment.id === action.id))
      if (index>-1) {
        if(action.value === "upVote")
          state.items[index].voteScore+=1
        else if (action.value === "downVote")
          state.items[index].voteScore-=1
        return Object.assign({}, state, {
          items: state.items
        })
      } else {
        return state
      }
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: true
      })
    case UPDATE_EDITED_COMMENT:
      const newitem = state.items.filter((comment) => (comment.id !== action.comment.id))
      return Object.assign({}, state, {
        isFetchingComments: false,
        items: newitem.concat(action.comment).sort((a, b) => (b.timestamp-a.timestamp))
      })
    case ADD_NEW_COMMENT:
      return Object.assign({}, state, {
        items: state.items.concat(action.comment).sort((a, b) => (b.timestamp-a.timestamp))
      })
    case REMOVE_COMMENT:
      return Object.assign({}, state, {
        items: state.items.filter((comment) => (comment.id !== action.comment.id))
      })
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: false,
        items: state.items.concat(action.comments).sort((a, b) => (b.timestamp-a.timestamp))
      })
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
})
