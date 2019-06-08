import React from 'react'
import {
  List,
  Image
} from 'semantic-ui-react'

const UserEntry = (props) => {
  return (
    <List.Item >
      <Image avatar src={props.user.avatar} />
      <List.Content>
        <List.Header>{`${props.user.first_name} ${props.user.last_name}`}</List.Header>
        <List.Description as='a'>{props.user.email}</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default UserEntry
