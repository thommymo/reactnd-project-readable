import React, {Component} from 'react'
import {
  Label, Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeVoteScore } from '../actions'

class VoteScore extends Component {

  handleVoteScoreClick = (e, { name }) => {
    console.log(name);
    let value = 1
    if(name==="minus"){
      value = -1
    }
    this.props.dispatch(changeVoteScore(this.props.postid, value))
  }

  render(){
    return(
      <Button.Group size='mini'>
        <Button color='grey' size='mini' name='votescore'>VoteScore</Button>
        <Button name='plus' onClick={this.handleVoteScoreClick} size='mini' icon='plus' />
        <Button.Or text={this.props.voteScore} size='mini'/>
        <Button name='minus' onClick={this.handleVoteScoreClick} size='mini' icon='minus' />
      </Button.Group>
    )
  }
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch }
}

export default connect(mapStateToProps)(VoteScore)
