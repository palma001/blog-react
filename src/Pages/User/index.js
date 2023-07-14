import * as React from 'react';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import UserForm from './UserForm';



export default function User () {
  const [users, setUsers] = React.useState([])
  const [user, setUser] = React.useState({})
  
  const otherUser = () => {
    setUsers(
      [...users, user]
    )
    console.log(user, users)
  }

  const receiveData = (data) => {
    setUser(data)
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h1>Users</h1>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={otherUser}>
              <Add />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <h2>Add User</h2>
          </Grid>
          {
            users.sort()
              .map((userOne, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <UserForm data={userOne} sendData={receiveData}/>
                  </Grid>
                )
              })
          }
        </Grid>
      </Box>
    </>
  )
}