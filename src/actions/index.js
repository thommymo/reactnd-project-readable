export const SORT_POSTS = 'SORT_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CHANGE_VOTE_SCORE = 'CHANGE_VOTE_SCORE'
export const UPDATE_EDITED_COMMENT = 'UPDATE_EDITED_COMMENT'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_EDITED_POST = 'UPDATE_EDITED_POST'

export function updateEditedPost (post) {
  return {
    type: UPDATE_EDITED_POST,
    post: post
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function removePost (post){
  return {
    type: REMOVE_POST,
    post: post
  }
}

export function removeComment (comment){
  return{
    type: REMOVE_COMMENT,
    comment: comment
  }
}

export function addNewComment (comment){
  return {
    type: ADD_NEW_COMMENT,
    comment: comment
  }
}

export function updateEditedComment (comment){
  return {
    type: UPDATE_EDITED_COMMENT,
    comment: comment
  }
}

export function changeVoteScore (id, value){
  return {
    type: CHANGE_VOTE_SCORE,
    id: id,
    value: value
  }
}

export function requestComments(){
  return {
    type: REQUEST_COMMENTS
  }
}

export function receiveComments(postid, json){
  return {
    type: RECEIVE_COMMENTS,
    comments: json,
    postid: postid
  }
}

export function requestCategories(){
  return {
    type: REQUEST_CATEGORIES
  }
}

export function receiveCategories(json){
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories
  }
}

export function requestPosts(){
  return {
    type: REQUEST_POSTS
  }
}

export function receivePosts(json){
  return {
    type: RECEIVE_POSTS,
    posts: json
  }
}

export function sortPosts(sortValue, sortOrder){
  return {
    type: SORT_POSTS,
    sortValue: sortValue,
    sortOrder: sortOrder
  }
}

//these variables are for communicating with the API

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'
let token = localStorage.token
if (!token)
 token = localStorage.token = uuidv4(new Date().getTime())

const headers = {
 'Authorization': token,
 'Content-Type': 'application/json'
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    ((c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & 15)) >> c / 4).toString(16)
  )
}

/*
All the following functions are thunk middlware.
The implementation is based on: http://redux.js.org/docs/advanced/AsyncActions.html
I left the comments on the first thunk middleware function to understand what happens here.
*/

export function fetchCategories() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestCategories())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    fetch(`${api}/categories`, { method: 'GET', headers })
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing an loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occured.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveCategories(json))
      )
  }
}

export function fetchPosts(postid = undefined) {
    return function (dispatch) {
      dispatch(requestPosts())

      fetch(`${api}/posts`, { method: 'GET', headers })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(json => dispatch(receivePosts(json)))
    }
}

export function fetchPostsWithComments(postid = undefined) {
    return function (dispatch) {
      dispatch(requestPosts())

      fetch(`${api}/posts`, { method: 'GET', headers })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(json => {
          dispatch(receivePosts(json))
          for(let i=0; i<json.length; i++){
            dispatch(fetchComments(json[i].id))
          }
        })
    }
}

export function fetchComments(id) {
  return function (dispatch) {
    dispatch(requestComments())
    fetch(`${api}/posts/${id}/comments`, { method: 'GET', headers })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json => dispatch(receiveComments(id, json)))
  }
}

export function saveComment(parentId, body, author){
  return function (dispatch) {
      let data = {
        'id': uuidv4(),
        'timestamp': new Date().getTime(),
        'body': body,
        'author': author,
        'parentId': parentId
      }
      fetch(`${api}/comments`, {
        headers ,
        body: JSON.stringify(data),
        method: 'POST',
      })
      .then((res) => (res.json()))
      .then((json) => dispatch(addNewComment(json)))
    }
}
export function updateComment(id, parentId, body, author){
  return function (dispatch) {
      let data = {
        'id': id,
        'body': body,
        'author': author
      }
      fetch(`${api}/comments/${id}`, {
        headers ,
        body: JSON.stringify(data),
        method: 'PUT',
      })
      .then((res) => (res.json()))
      .then(json => dispatch(updateEditedComment(json)))
    }
}
export function updatePost(id, title, body, category, author){
  return function (dispatch) {
      let data = {
        'title': title,
        'body': body,
        'author': author,
        'category': category,
      }
      fetch(`${api}/posts/${id}`, {
        headers ,
        body: JSON.stringify(data),
        method: 'PUT',
      })
      .then((res) => (res.json()))
      .then((json) => dispatch(updateEditedPost(json)))
    }
}
export function savePost(title, body, category, author){
  return function (dispatch) {
      let data = {
        'id': uuidv4(),
        'timestamp': new Date().getTime(),
        'title': title,
        'body': body,
        'author': author,
        'category': category,
      }
      fetch(`${api}/posts`, {
        headers ,
        body: JSON.stringify(data),
        method: 'POST',
      })
      .then((res) => (res.json()))
      .then((json) => dispatch(addPost(json)))
    }
}
export function deletePost(id){
  return function (dispatch) {
      fetch(`${api}/posts/${id}`, {
        headers ,
        method: 'DELETE',
      })
      .then((res) => (res.json()))
      .then((json) => dispatch(removePost(json)))
    }
}
export function deleteComment(id, parentId){
  return function (dispatch) {
      fetch(`${api}/comments/${id}`, {
        headers ,
        method: 'DELETE',
      })
      .then((res) => (res.json()))
      .then((json) => dispatch(removeComment(json)))
    }
}

export function saveVote(id, vote, posttype){
  return function (dispatch) {
      if(posttype === "comments" || posttype === "posts"){
        let data = {
          'option': vote
        }
        fetch(`${api}/${posttype}/${id}`, {
          headers ,
          body: JSON.stringify(data),
          method: 'POST',
        })
        .then((res) => (res.json()))
        .then(() => dispatch(changeVoteScore(id, vote)))
      }
    }
}
