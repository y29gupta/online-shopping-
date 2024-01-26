import React from 'react'
import UserSidebarMenu from './UserSidebarMenu'
import { Box, Grid } from '@mui/material'
import UserProfile from './UserProfile'

const UserDashboard = () => {
  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item md={2}>
          <Box>
            <UserSidebarMenu />
          </Box>
        </Grid>
        <Grid item md={10}>
          <Box>

            fgbliub
          </Box>
        </Grid>
      </Grid> */}
      <UserProfile/>
    </>
  )
}

export default UserDashboard