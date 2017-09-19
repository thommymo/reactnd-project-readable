import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Modal, Button, Header, Form, TextArea, Container, Input
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { savePost, updatePost } from '../actions'

class AddAndEditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      title: this.props.title,
      body: this.props.body,
      author: this.props.author,
      category: this.props.category,
      submit: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  state = {
    modalOpen: false,
    placeholderCategory: "Choose a category",
    placeholderTitle: "Add a Title",
    placeholderBody: "Add a Body",
    placeholderAuthor: "Add your Name"
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
    //Disable Submit Button if an entry is empty
    if(value === "" || this.state.body === "" || this.state.author === ""){
      this.setState({ submit: false })
    } else{
      this.setState({ submit: true })
    }
  }

  handleSubmit(event) {
    const postid = this.props.postid
    const title = this.state.title
    const body = this.state.body
    const category = this.state.category
    const author = this.state.author

    if(postid){
      this.props.dispatch(updatePost(postid, title, body, category, author))
    }else{
      this.props.dispatch(savePost(title, body, category, author))
      this.setState({
        title: "",
        body: "",
        author: "",
        category: "",
      })
    }
    this.handleClose()
    event.preventDefault()
  }

  render() {
    return (
      <Modal
        trigger={
          <Button
            onClick={this.handleOpen}
            icon={this.props.icon}
            size='mini'
            content={this.props.content}
            color='blue'
          />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        closeIcon
      >
        <Header as='h1' content={this.props.content}/>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Input
              name="title"
              value={this.state.title}
              style={{ paddingBottom:20 }}
              placeholder={this.state.placeholderTitle}
              onChange={this.handleInputChange}
            />
            <TextArea
              name="body"
              value={this.state.body}
              placeholder={this.state.placeholderBody}
              style={{ minHeight:150 }}
              onChange={this.handleInputChange}
            />
            <Container style={{ paddingTop:20 }}>
              <select
                name="category"
                value={this.state.category}
                placeholder={this.state.placeholderCategory}
                onChange={this.handleInputChange}
              >
                {this.props.categories.map((option) => (
                  <option key={option.name} value={option.name}>{option.name}</option>
                ))}
              </select>
            </Container>
            <Input
              name="author"
              value={this.state.author}
              style={{ paddingTop:20 }}
              placeholder={this.state.placeholderAuthor}
              onChange={this.handleInputChange}
            />
            <Container textAlign='right' style={{ paddingTop:20 }}>
              <Button type='submit' inverted disabled={!this.state.submit}>Submit</Button>
            </Container>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

AddAndEditPost.defaultProps = {
  body: "",
  author: "",
  title: "",
  category: ""
}

AddAndEditPost.propTypes = {
  postid: PropTypes.string,
  icon: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  body: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

function mapStateToProps (store) {
  return {dispatch: store.dispatch, categories: store.categories.items }
}

export default connect(mapStateToProps)(AddAndEditPost);
