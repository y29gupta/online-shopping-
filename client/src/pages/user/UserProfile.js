
// import React from 'react'
import UserSidebarMenu from './UserSidebarMenu'

import { Backdrop, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModel, userRegister, userUpdate } from '../../redux/features/user/userSlice'
import { toast } from 'react-toastify'
import axios from 'axios'


const inputlist = [
    {
        id:1,
        name: "name",
        type: "text",
        label: "name",
        disable:false
    },
    {
        id:2,
        name: "email",
        type: "email",
        label: "email",
        disable:true

    },
    {
        id:3,
        name: "password",
        type: "password",
        label: "password",
        disable:false

    },
    {
        id:4,
        name: "phone",
        type: "text",
        label: "phone",
        disable:false

    },
    {
        id:5,
        name: "address",
        type: "text",
        label: "address",
        disable:false

    }
]
const loginSchema = yup.object().shape({
    name: yup.string('should be string').required("Name is required"),
    email: yup.string('Should be a string').required('Email is required').email("Invalid email"),
    password: yup.string("should be string"),
    phone: yup.string('should be string').required("Mobile number is required"),
    address: yup.string('should be string').required("Address is required"),


})

function UserProfile() {
  const { loading, status } = useSelector(state => state.user)
  const {userInfo,token}=useSelector(state=>state.user.userData)

  useEffect(()=>{
    
  },[])

  const dispatch = useDispatch()
  const closemodel = () => {
      dispatch(toggleModel())

      
  }

  const userdata={
    name:userInfo? userInfo.name:"",
    email:userInfo? userInfo.email:'',
    password:"",
    phone:userInfo? userInfo.phone:'',
    address:userInfo? userInfo.address:''
  }
  const formik = useFormik({
      initialValues: userdata,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        dispatch(userUpdate({token,values}))
         
      },
      enableReinitialze: true,
  })
  return (
   <>
    <Grid container spacing={4}>
        <Grid item md={2}>
          <Box>

          <UserSidebarMenu />
          </Box>
        </Grid>
        <Grid item md={8} sx={{margin:"auto "}}>
      <Box sx={{margin:"10px"}}>
        <Typography sx={{backgroundColor:"gray",padding:"7px",textAlign:"center",fontWeight:"600"}}>Update User Profile</Typography>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
                    {
                        inputlist.map((input,index) => {
                            let isError = formik.touched[input.name] && Boolean(formik.errors[input.name])
                            return (
                                <>
                                    <Box mt={2} mb={2}  key={input.id}>

                                        <TextField
                                        
                                            label={input.label}
                                            variant='standard'
                                            fullWidth
                                            type={input.type}
                                            name={input.name}
                                            size='small'
                                            // disabled={input.disable}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            // error={isError}
                                            value={formik?.values[input.name]}
                                            helperText={formik.errors[input.name]}
                                        />

                                    </Box>
                                </>
                            )
                        })
                    }

                    <Grid container justifyContent="end">

                        <Grid item>


                            <Button type="submit" size='small' variant='contained'>Update</Button>
                            {/* <Button size="small" style={{ marginLeft: "10px", fontWeight: "600" }} onClick={closemodel} variant='outlined'>Cancel</Button> */}
                        </Grid>

                    </Grid>
                    {
                        loading ? <CircularProgress sx={{ ml: "auto" }} color="inherit" /> : ""
                    }


                </form>
      </Box>
        </Grid>
      </Grid>
   </>
  )
}

export default UserProfile