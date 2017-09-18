import React, { Component } from 'react';
import {
  Modal, Button, Link, Icon, Header, Form, TextArea, Checkbox, Container, Input
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveComment } from '../actions'

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit(event) {
    this.props.dispatch(saveComment(this.props.postid, this.textarea.ref.value, this.input.inputRef.value))
    this.handleClose()
    event.preventDefault()
  }

  render() {

    return (

      <Modal
        trigger={<Button onClick={this.handleOpen} icon='plus' size='mini' content='Add Comment' color='grey' />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >
        <Header as='h1' content='Add Comment' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <TextArea
              placeholder='Add your comment'
              style={{ minHeight:150 }}
              ref={(textarea) => this.textarea = textarea}
            />
            <Input style={{ paddingTop:20 }} placeholder='Add your username' ref={(input) => this.input = input}/>
            <Container textAlign='right' style={{ paddingTop:20 }}>
              <Button type='submit' inverted>Submit</Button>
            </Container>
          </Form>
        </Modal.Content>

      </Modal>

    );
  }
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch }
}

export default connect(mapStateToProps)(AddComment);
