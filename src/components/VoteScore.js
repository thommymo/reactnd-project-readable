import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveVote } from '../actions'

class VoteScore extends Component {

  handleVoteScoreClick = (e, { name }) => {
    this.props.dispatch(saveVote(this.props.id, name, this.props.posttype))
  }

  render(){
    return(
      <Button.Group size='mini'>
        <Button size='mini' name='votescore'>VoteScore</Button>
        <Button name='upVote' onClick={this.handleVoteScoreClick} size='mini' icon='plus' />
        <Button.Or text={this.props.voteScore} size='mini'/>
        <Button name='downVote' onClick={this.handleVoteScoreClick} size='mini' icon='minus' />
      </Button.Group>
    )
  }
}

VoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  posttype: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch }
}

export default connect(mapStateToProps)(VoteScore)
