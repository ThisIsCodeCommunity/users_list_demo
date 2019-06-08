
import React, { Component } from 'react';
import axios from 'axios'
import {
  Header,
  Container,
  List
} from 'semantic-ui-react'
import UserEntry from './UserEntry'


class App extends Component {
  state = {
    users: [],
    errorMessage: ''
  }

  componentDidMount() {
    this.fetchUsers()
    // axios.get('https://reqres.in/api/users/23') //Note this will raise a 404 error
    //   .then(response => {
    //     this.setState({ users: [response.data.data] })
    //   })
    //   .catch(() => {
    //     this.setState({ errorMessage: 'That did not fly' })
    //   })
  }


  fetchUsers = async () => {
    try {
      let response = await axios.get('https://reqres.in/api/users/23')
      this.setState({ users: [response.data.data] })
    }
    catch(error) {
      this.setState({ errorMessage: `Oh! a ${error.request.status}` })
    }

  }

  displayErrorMessage = () => {
    return (
      <Header as='h3'>{this.state.errorMessage}</Header>
    )
  }

  render() {
    let usersList = this.state.users.map(user => {
      return (
        <UserEntry key={user.id} user={user} />
      )
    })
    return (
      <>
        <Container>
          <Header as='h2'>Users List</Header>
          {this.state.errorMessage ? this.displayErrorMessage() : null}
          <List>
            {usersList}
          </List>
        </Container>

      </>
    );
  }
}

export default App;