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
    this.state = {
      modalOpen: false,
      body: this.props.body,
      author: this.props.author,
      submit: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
    if(value === "" || this.state.body === "" || this.state.author === ""){
      this.setState({ submit: false })
    } else{
      this.setState({ submit: true })
    }
  }

  handleSubmit(event) {
    if(this.props.id){
      this.props.dispatch(updateComment(this.props.id, this.props.parentId, this.state.body, this.state.author))
    }else{
      this.props.dispatch(saveComment(this.props.parentId, this.state.body, this.state.author))
      this.setState({
        body: "",
        author: "",
      })
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
              name="body"
              value={this.state.body}
              placeholder='Add your comment'
              style={{ minHeight:150 }}
              onChange={this.handleInputChange}
            />
            <Input
              name="author"
              value={this.state.author}
              style={{ paddingTop:20 }}
              placeholder='Add your username'
              onChange={this.handleInputChange}
            />
            <Container textAlign='right' style={{ paddingTop:20 }}>
              <Button type='submit' inverted disabled={!this.state.submit}>Submit</Button>
            </Container>
          </Form>
        </Modal.Content>
      </Modal>

    );
  }
}

AddandEditComment.defaultProps = {
  body: "",
  author: "",
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
