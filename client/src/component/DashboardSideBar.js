import { Box, ListItem, ListItemButton, ListItemText, MenuList, Paper, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function DashboardSideBar(props) {
    
  const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
  return (
   <>
  <Box style={{
        display: "flex",
      }}>


        <Paper sx={{ width: 320, maxWidth: '100%',backgroundColor:'black',height:"", }}>
          {/* <Typography variant='h6' sx={{color:"white",backgroundColor:"rgba(0,0,0,0.9"}}>Dashboard</Typography> */}
          <MenuList >
          {
          props?.dashboard.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' ,textAlign:'right'}}>
              
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  // px: 2.5,
                }}
              > 
             
                <NavLink to={text.to} style={{textDecoration:"none",color:"white"}}><ListItemText primary={text.label}/></NavLink>
              </ListItemButton>
            </ListItem>
          ))}
      

          </MenuList>
        </Paper>

      </Box>
   </>
  )
}

export default DashboardSideBar