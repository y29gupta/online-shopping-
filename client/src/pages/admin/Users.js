import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'

function Users() {
  return (
   <>
     <Grid container>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid item>
         user
        </Grid>
      </Grid>
   </>
  )
}

export default Users