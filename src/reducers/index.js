import { combineReducers } from 'redux'

import {
  ADD_POST,
  ADD_COMMENT_TO_POST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SORT_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS
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
  isFetchingComments: false,
  sortValue: 'voteScore',
  sortOrder: 'arrow up',
  items: []
}

function posts (state = initialPostsState, action) {
  switch(action.type){
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: true
      })
    case RECEIVE_COMMENTS:


      // This does not work, when somebody did not load posts first...
      // TODO: Make this work, when a user is hitting a direct URL
      // See http://redux.js.org/docs/advanced/AsyncActions.html how
      // to solve this. There is a fetchPostsIfNeeded function. I think
      // I should implement something similar

      //1. Get Index of the post
      const foundIndex = state.items.findIndex((post) => (post.id === action.postid))
      //2. Add Comments to the post
      //TODO: Is this the right way to add commments to a post id?
      if(foundIndex !== -1)
        state.items[foundIndex].comments = action.comments

      return Object.assign({}, state, {
        isFetchingComments: false,
        items: state.items
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts.sort((a, b) => (b[state.sortValue]-a[state.sortValue]))
      })
    case SORT_POSTS:
      return Object.assign({}, state, {
        sortValue: action.sortValue,
        sortOrder: action.sortOrder,
        items: state.items.sort((a, b) => {
          if (action.sortValue === "voteScore") {
            return b[action.sortValue]-a[action.sortValue]
          } else {
            return a[action.sortValue]-b[action.sortValue]
          }
        })
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
      items: [
        {
          author: "thingtwo",
          body: "Everyone says so after all.",
          category:"react",
          deleted:false,
          id:"8xf0y6ziyjabvozdd253nd",
          timestamp:1467166872634,
          title:"Udacity is the best place to learn React",
          voteScore:6,
          comments: [
            {
              author: "thingtwo",
              body: "Everyone says so after all.",
              deleted:false,
              id:"8xf0y6ziyjabvozdd253nd",
              timestamp:1467166872634,
              title:"Udacity is the best place to learn React",
              voteScore:6,
            }
          ]
      }]
  }
}
