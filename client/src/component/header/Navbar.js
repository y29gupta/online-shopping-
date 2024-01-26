import React, { useEffect, useState } from 'react'
import { AppBar, Button, Stack, Toolbar, useMediaQuery, useTheme, Typography, Menu, MenuItem, Grid, TextField, Badge } from "@mui/material"
import { NavLink, useNavigate } from 'react-router-dom'
import { navMenu } from '../Menu'
import Drawerside from './Drawerside'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModel, userLgout } from '../../redux/features/user/userSlice'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import { toast } from 'react-toastify'
import { cartTotalItem, productSearch } from '../../redux/features/productSlice'
// import { toToastItem } from 'react-toastify/dist/utils'
function Navbar() {
  const { token, userInfo } = useSelector(state => state.user.userData)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const {cart,totalItem}=useSelector(state=>state.product)
  // console.log(first)
  const theme = useTheme()

  const ismatch = useMediaQuery(theme.breakpoints.down('md'))


  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(cartTotalItem())
   
  },[totalItem])

  const logoutuser = () => {

    dispatch(userLgout())
    handleClose()

    localStorage.removeItem("userInfo")
    toast.success("logged out successfully ")

  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchProduct = async () => {
    if (searchTerm) {

      let result = await dispatch(productSearch(searchTerm))
      if (result.payload) {
        navigate('/search-filter-product')
      }

    }
  }

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar style={{
          // background:" rgb(2,0,36)",
          backgroundColor: "black"
          // background: "linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.3841911764705882) 35%, rgba(0,212,255,1) 100%)"
        }}>
          <img src="logo.png" alt="" style={{ width: "80px", height: "60px" }} />
          <Typography variant={ismatch ? "h6" : "h4"} style={{ color: "red", fontFamily: "Stylish" }} component="p">Add <span style={{ color: "yellow" }} >To</span> Cart.com</Typography>
          {
            ismatch ? <Drawerside /> : (
              <>
                <Grid container sx={{ backgroundColor: "" }} md={5} justifyContent="flex-end" alignItems="center">
                  <Grid item md={6}>
                    <TextField
                      label="Search "
                      variant="filled"

                      value={searchTerm}
                      onChange={handleInputChange}

                      size='small'
                      sx={{
                        '& .css-tedvjx-MuiFormLabel-root-MuiInputLabel-root': {
                          color: 'white', // Change placeholder color here
                        },

                        '& input:valid, & input:focus, & input:active': {

                          color: "white",
                          borderBottom: '2px solid white'

                        },

                        '& label.Mui-focused': {
                          color: 'white', // Change label color when focused

                        },
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={searchProduct} sx={{ marginLeft: "20px", color: "white", borderColor: 'white' }} variant="outlined" size='small' color="primary" >
                      Search
                    </Button>
                  </Grid>
                </Grid>

                <Stack direction="row" ml="auto" spacing={2}>
                  {
                    navMenu.map((item, index) => {
                      return (
                        <>
                          <NavLink key={index} to={item.to} style={{ textDecoration: "none", color: "white" }}><Typography variant='h6' component="p" sx={{ lineHeight: "30px" }}>{item.label}</Typography></NavLink>

                        </>

                      )
                    })
                  }
                  <NavLink to='/cart'>

                  <Badge color="error" badgeContent={totalItem}>
                    <ShoppingCartOutlinedIcon sx={{fontSize:"30px",color:"white"}} />
                  </Badge>
                  </NavLink>


                </Stack>
                {
                  token ? (
                    <>
                      <Button
                        id="basic-button"
                        variant='contained'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ borderColor: "secondary.main", color: "white", ml: 2 }}
                        size='small'
                      >
                        {
                          userInfo.role == '1' ? "Admin" : "User"
                        }
                         { open? <KeyboardArrowUpIcon/> :<KeyboardArrowDownIcon/>}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}

                      >
                        <MenuItem onClick={handleClose} > <NavLink style={{ textDecoration: "none", color: "black" }} to={`/dashboard/${userInfo?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink> </MenuItem>
                        <MenuItem onClick={logoutuser}>Logout</MenuItem>

                      </Menu>
                      {/* <Button onClick={logoutuser} size='small' sx={{ borderColor: "secondary.main", color: "secondary.main", fontWeight: "600", ml: "25px" }} variant='outlined'>Logout</Button> */}
                    </>

                  ) : (

                    <Button size='small' sx={{ borderColor: "secondary.main", color: "secondary.main", fontWeight: "600", ml: "25px" }} variant='outlined' onClick={() => dispatch(toggleModel("/"))}>Login</Button>
                  )
                }

              </>
            )
          }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar