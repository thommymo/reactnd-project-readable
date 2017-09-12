export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST'

export function addPost({title, author, content}){
  return {
    type: ADD_POST,
    title,
    author,
    content
  }
}

export function addCommentToPost({post, author, content}){
  return {
    type: ADD_COMMENT_TO_POST,
    post,
    author,
    content
  }
}

// TODO: Add all other actions
