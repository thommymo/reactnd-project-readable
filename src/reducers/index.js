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
  RECEIVE_COMMENTS,
  CHANGE_VOTE_SCORE
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
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetchingComments: false,
        // return items only if the items are not in the array yet.
        items: state.items.concat(
          action.comments.filter( (comment) => (
            state.items.find((item) => (comment.id === item.id))  === undefined
          )
        ))

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

      }]
    },
    comments: {
      isFetching: false,
      items: [
        {
          author: "thingtwo",
          body: "Everyone says so after all.",
          deleted:false,
          id:"8xf0y6ziyjabvozdd253nd",
          parentDeleted:false,
          parentId:"8xf0y6ziyjabvozdd253nd",
          timestamp:1467166872634,
          title:"Udacity is the best place to learn React",
          voteScore:6,
        }
      ]
    }
  }
