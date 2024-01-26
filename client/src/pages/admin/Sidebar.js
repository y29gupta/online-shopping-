import React from 'react'
// import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography, useTheme } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import MailIcon from '@mui/icons-material/Mail';
// import InboxIcon from '@mui/icons-material/Inbox';
// import CategoryIcon from '@mui/icons-material/Category';
import { adminMenu } from '../../component/Menu';
// import { NavLink } from 'react-router-dom'



// // import Divider from '@mui/material/Divider';
// // import Paper from '@mui/material/Paper';
// import MenuList from '@mui/material/MenuList';
// import MenuItem from '@mui/material/MenuItem';
// // import ListItemText from '@mui/material/ListItemText';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import Typography from '@mui/material/Typography';
// import ContentCut from '@mui/icons-material/ContentCut';
// import ContentCopy from '@mui/icons-material/ContentCopy';
// import ContentPaste from '@mui/icons-material/ContentPaste';
// import Cloud from '@mui/icons-material/Cloud';
import DashboardSideBar from '../../component/DashboardSideBar';
const Sidebar = () => {

  // const [open, setOpen] = React.useState(false);
  // // const theme = useTheme();
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };



  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
    <DashboardSideBar dashboard={adminMenu}/>
      {/* <Box style={{
        display: "flex",
        

        // background:" linear-gradient(5deg, rgba(2,0,36,1) 0%, rgba(7,9,121,0.3841911764705882) 50%, rgba(0,212,255,1) 100%)"
      }}>


        <Paper sx={{ width: 320, maxWidth: '100%',backgroundColor:'black',height:"", }}>
          <MenuList >
          {
          adminMenu?.map((text, index) => (
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

      </Box> */}
    </>
  )
}

export default Sidebar