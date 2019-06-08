
import React, { Component } from 'react';
import axios from 'axios'
import {
  Header,
  Container,
  List,
  Button,
  Pagination
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

  handlePageNumber = (data) => {
    this.setState({ pageNumber: data.activePage }, () => {
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

          <Pagination
            boundaryRange={0}
            onPageChange={(event, data) => this.handlePageNumber(data)}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={this.state.totalPages}
          />
        </Container>

      </>
    );
  }
}

export default App;