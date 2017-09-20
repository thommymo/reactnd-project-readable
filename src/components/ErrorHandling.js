import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Message } from 'semantic-ui-react'

class ErrorHandling extends Component {

  render() {
    if (this.props.errors.hasError) {
      // You can render any custom fallback UI
      return (
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={16}>
              <Message
                icon='exclamation triangle'
                header={`Something went wrong with ${this.props.errors.reason}.`}
                content='Check if your Server is Running.'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    return this.props.children;
  }
}

function mapStateToProps (store) {
  return {errors: store.errors }
}

export default connect(mapStateToProps)(ErrorHandling);
