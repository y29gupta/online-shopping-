import React from 'react'
// import {AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme} from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import MailIcon from '@mui/icons-material/Mail';
// import InboxIcon from '@mui/icons-material/Inbox';
// import CategoryIcon from '@mui/icons-material/Category';
import {  userMenu } from '../../component/Menu';
import DashboardSideBar from '../../component/DashboardSideBar';

const UserSidebarMenu = () => {

  //   const [open, setOpen] = React.useState(false);
  //   // const theme = useTheme();
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };


   
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
   <>
    {/* <Box style={{display:"flex", 

// background:" linear-gradient(5deg, rgba(2,0,36,1) 0%, rgba(7,9,121,0.3841911764705882) 50%, rgba(0,212,255,1) 100%)"
}}>
       
        <Toolbar>
          <IconButton
         
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color:"white",
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        
        </Toolbar>
        <Drawer open={open}  
         onClose={handleDrawerClose}
        sx={{
          '& .MuiBackdrop-root':{
            top:'67px',
            bottom:"124px"
          },
          '& .MuiPaper-root':{
            top:"65px",
            height:"50%",
          background:" linear-gradient(to top, #1a237e 0%,  rgba(2,0,36,0.3) 90%)"

            
          }
        }}>
        
          <IconButton onClick={handleDrawerClose}>
          <Typography component="p" sx={{color:"white",margin:"10px"}}>Dashboard</Typography>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"white"}} /> : <ChevronLeftIcon style={{color:"white"}} />}
          </IconButton>
       
        <List>
          {
          userMenu.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <NavLink to={text.to} style={{textDecoration:"none",color:"white"}}><ListItemText primary={text.label}/></NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
       
        </Drawer>
      
    </Box> */}
    <DashboardSideBar dashboard={userMenu }/>
   </>
  )
}

export default UserSidebarMenu