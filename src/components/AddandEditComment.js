import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal, Button, Header, Form, TextArea, Container, Input
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveComment, updateComment } from '../actions'

class AddandEditComment extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit(event) {
    if(this.props.id){
      this.props.dispatch(updateComment(this.props.id, this.props.parentId, this.textarea.ref.value, this.input.inputRef.value))
    }else{
      this.props.dispatch(saveComment(this.props.parentId, this.textarea.ref.value, this.input.inputRef.value))
    }

    this.handleClose()
    event.preventDefault()
  }

  render() {
    
    return (

      <Modal
        trigger={
          <Button onClick={this.handleOpen}
            icon={this.props.icon}
            size='mini'
            content={`${this.props.buttonContent}`}
            color={this.props.color}
          />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >
        <Header as='h1' content={`${this.props.content} Comment`} />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <TextArea
              defaultValue={this.props.body}
              placeholder='Add your comment'
              style={{ minHeight:150 }}
              ref={(textarea) => this.textarea = textarea}
            />
            <Input
              defaultValue={this.props.author}
              style={{ paddingTop:20 }}
              placeholder='Add your username'
              ref={(input) => this.input = input}
            />
            <Container textAlign='right' style={{ paddingTop:20 }}>
              <Button type='submit' inverted>Submit</Button>
            </Container>
          </Form>
        </Modal.Content>
      </Modal>

    );
  }
}

AddandEditComment.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  body: PropTypes.string,
  author: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (store) {
  return { dispatch: store.dispatch }
}

export default connect(mapStateToProps)(AddandEditComment);
