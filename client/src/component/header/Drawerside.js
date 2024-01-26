import {  Button, Divider, Drawer, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { navMenu } from '../Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { toggleModel } from '../../redux/features/user/userSlice';

function Drawerside() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const togglebutton = () => {
    setOpen(!open)
  }
  return (
    <>
      <Drawer open={open} onClose={togglebutton} PaperProps={{
        sx: {
          width: 150,
          backgroundColor: "primary.main",
          opacity: 0.8
        }
      }}>
        <List>
          {
            navMenu.map((menu, index) => {
              return (
                <>
                  <ListItemButton key={index} onClick={() => { navigate(menu.to) }}>
                    <ListItemIcon style={{ color: "white", lineHeight: "15px", opacity: "0.8" }}>
                      {menu.icon}
                      <ListItemText>
                        <Typography variant='p' sx={{ color: "white", pl: "5px" }}>{menu.label}</Typography>
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </>
              )
            })
          }
     
        </List>
        <Divider color="black" />
        <Grid container style={{ position: 'absolute', bottom: "10px" }}>

          <Button onClick={() => dispatch(toggleModel('/'))} startIcon={<AccountCircleIcon />} fullWidth variant="filled" size="small" sx={{ fontWeight: '600', color: "secondary.main" }}>
            Login
          </Button>
          {/* <Button startIcon={<HowToRegIcon/>} fullWidth variant="filled" size="small"   sx={{fontWeight:'600',color:"secondary.main"}}>
          Sign Up
        </Button> */}
        </Grid>
      </Drawer>
      <IconButton sx={{ color: "white", marginLeft: "auto" }} onClick={togglebutton}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default Drawerside