import React, { Component } from 'react';
import {
  Modal, Button, Header, Form, TextArea, Container, Input, Dropdown
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { savePost, updatePost } from '../actions'

class AddAndEditPost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    //Check if input elements are not empty
    const postid = this.props.postid
    const title = this.title.inputRef.value
    const body = this.body.ref.value
    const category = this.category.state.value
    const author = this.author.inputRef.value
    let error = false

    if(title === ""){
      error = true
      this.setState({ placeholderTitle: "Error: Please add a title" })
    }
    if(body === ""){
      error = true
      this.setState({ placeholderBody: "Error: Please add a body" })
    }
    if(category === ""){
      error = true
      this.setState({ placeholderCategory: "Error: Please choose a category" })
    }
    if(author === ""){
      error = true
      this.setState({ placeholderAuthor: "Error: Please choose a author" })
    }
    if(!error){
      console.log(postid);
      if(postid){
        this.props.dispatch(updatePost(postid, title, body, category, author))
      }else{
        this.props.dispatch(savePost(title, body, category, author))
      }



      this.handleClose()
    }
    event.preventDefault()

  }

  render() {

    const options = this.props.categories.map(
      (category) => ({
        key: category.name,
        text: category.name,
        value: category.name
      }))


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
              defaultValue={this.props.title}
              style={{ paddingBottom:20 }}
              placeholder={this.state.placeholderTitle}
              ref={(title) => this.title = title}/>
            <TextArea
              defaultValue={this.props.body}
              placeholder={this.state.placeholderBody}
              style={{ minHeight:150 }}
              ref={(body) => this.body = body}
            />
            <Container style={{ paddingTop:20 }}>
              <Dropdown
                defaultValue={this.props.category}
                options={options}
                selection
                placeholder={this.state.placeholderCategory}
                ref={(category) => this.category = category}
              />
            </Container>
            <Input
              defaultValue={this.props.author}
              style={{ paddingTop:20 }}
              placeholder={this.state.placeholderAuthor}
              ref={(author) => this.author = author}
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

function mapStateToProps (store) {
  return {dispatch: store.dispatch, categories: store.categories.items }
}

export default connect(mapStateToProps)(AddAndEditPost);
