import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteComment } from '../actions'

class DeleteComment  extends Component {

  handleDelete = () => {
    if(this.props.commentId){
      this.props.dispatch(deleteComment(this.props.commentId, this.props.parentId))
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

DeleteComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch}
}

export default connect(mapStateToProps)(DeleteComment);
