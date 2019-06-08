
import React, { Component } from 'react';
import axios from 'axios'
import {
  Header,
  Container,
  List,
  Button
} from 'semantic-ui-react'
import UserEntry from './UserEntry'


class App extends Component {
  state = {
    users: [],
    errorMessage: '',
    pageNumber: 1,
    totalPages: 1
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

  incrementPageNumber = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 }, () => {
      this.fetchUsers()
    })
  }

  decresePageNumber = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
      this.fetchUsers()
    })
  }


  fetchUsers = async () => {
    try {
      let response = await axios.get(`https://reqres.in/api/users?per_page=5&page=${this.state.pageNumber}`)
      console.log(response.data)
      this.setState({ users: response.data.data, totalPages: response.data.total_pages })
    }
    catch (error) {
      this.setState({ errorMessage: `Oh! a ${error.request.status}` })

    }

  }

  displayErrorMessage() {
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
          <Button
            primary
            disabled={this.state.pageNumber === 1 }
            onClick={this.decresePageNumber.bind(this)}
          >
            Previous Page
            </Button>
          <Button
            primary
            disabled={this.state.pageNumber === this.state.totalPages }
            onClick={this.incrementPageNumber.bind(this)}
          >
            Next Page
            </Button>
        </Container>

      </>
    );
  }
}

export default App;