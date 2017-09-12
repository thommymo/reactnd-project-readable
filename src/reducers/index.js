import { combineReducers } from 'redux'
//import { getAllCategories } from '../utils/api'

import {
  ADD_POST,
  ADD_COMMENT_TO_POST,
} from '../actions'

const initialCategoriesState = {
  categories: {
    name: "peter", path: "path"
  }
}

const initialPostsState = {

}

function categories (state = initialCategoriesState, action) {
  console.log(state.categories.name)

  return state
}

function posts (state = initialPostsState, action) {
  switch(action.type){
    case ADD_POST:
      //TODO: Add the correct return state for adding a post
      return state
    case ADD_COMMENT_TO_POST:
      //TODO: Add the correct return state for adding a comment
      return state
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
