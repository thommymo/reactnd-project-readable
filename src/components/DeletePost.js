import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deletePost } from '../actions'
import { withRouter } from "react-router-dom";

class DeletePost extends Component {

  handleDelete = () => {
    if(this.props.postid){
      this.props.dispatch(deletePost(this.props.postid))
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <Button
        icon='delete'
        color="red"
        content="Delete"
        onClick={this.handleDelete}
      />
    )
  }
}

DeletePost.propTypes = {
  postid: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch}
}

export default withRouter(connect(mapStateToProps)(DeletePost));
