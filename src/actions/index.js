export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CHANGE_VOTE_SCORE = 'CHANGE_VOTE_SCORE'

export function changeVoteScore (postid, value){
  return {
    type: CHANGE_VOTE_SCORE,
    postid: postid,
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

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'
let token = localStorage.token = 'whatever'

console.log(localStorage.token)
if (!token)
 token = localStorage.token = 'whatever'

 console.log(localStorage.token)

const headers = {

 'Authorization': token,
 'Content-Type': 'application/json'
}

//TODO: Here another action would be required: What happens, when there is an error when requesting or receiveing categories: http://redux.js.org/docs/advanced/AsyncActions.htmls


// START COPIED FROM HERE: http://redux.js.org/docs/advanced/AsyncActions.html

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

//TODO: What does  process.env.REACT_APP_CONTACTS_API_URL  really do?


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

// END COPIED FROM HERE: http://redux.js.org/docs/advanced/AsyncActions.html

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

export function fetchPosts(postid = undefined) {
    return function (dispatch) {
      dispatch(requestPosts())

      fetch(`${api}/posts`, { method: 'GET', headers })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(json =>
          dispatch(receivePosts(json))
        )
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
      .then(json =>
        dispatch(receiveComments(id, json))
      )
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
export function saveComments(parentId, body, author){
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
      }).then((res) => (res.json())).then(() =>
        dispatch(fetchComments(parentId)))

    }
}

export function addPost({title, author, content}){
  return {
    type: ADD_POST,
    title,
    author,
    content
  }
}

export function addCommentToPost(postid, body, author){
  return {
    type: ADD_COMMENT_TO_POST,
    postid,
    body,
    author
  }
}

export function sortPosts(sortValue, sortOrder){
  return {
    type: SORT_POSTS,
    sortValue: sortValue,
    sortOrder: sortOrder
  }
}


// TODO: Add all other actions
