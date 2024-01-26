import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {NavLink} from  'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleModel, userLogin } from '../../redux/features/user/userSlice'
import { toast } from 'react-toastify'

const inputlist = [
    {
        name: "email",
        type: "email",
        label: "email"
    },
    {
        name: "password",
        type: "password",
        label: "password"
    }
]
const loginSchema = yup.object().shape({
    email: yup.string('Should be a string').required('Email is required').email("Invalid email"),
    password: yup.string("should be string").required("password is required")
})
function LoginForm(props) {
    const {path}=props
    // const loading=useSelector(state=>state.user.loading)
    const dispatch=useDispatch()

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: loginSchema,
        onSubmit:  (values) => {
        dispatch(userLogin({values,path}))
       
           
        }
    })
    return (
        <>
            <Box sx={{backgroundColor:"white"}}> 
                <Typography variant="h5" style={{ color: "red", fontFamily: "Stylish", textAlign: "center" }} >Add <span style={{ color: "yellow" }} >To</span>Cart <small style={{color:"green"}}> .com</small></Typography>
                <Typography variant='h6' sx={{ color: "primary.main", fontWeight: "600", textAlign: "center" }}>Login</Typography>

            </Box>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                {
                    inputlist.map(input => {
                        let isError=formik.touched[input.name] && Boolean(formik.errors[input.name])
                        return (
                            <>
                                <Box mt={2} mb={2} key={input.name}>

                                    <TextField
                                        label={input.label}
                                        variant='filled'
                                        fullWidth
                                        name={input.name}
                                        size='small'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={isError}
                                        value={formik.values[input.name]}
                                        helperText={formik.errors[input.name]}
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
                                    />

                                </Box>
                            </>
                        )
                    })
                }

                <Grid container justifyContent="space-between">
                    <Grid item>
                <Typography component="p">Don't have an account?</Typography>
                <NavLink  style={{color:"white",opacity:"0.8"}} onClick={()=>{props.registerState(true)}}><Typography component="p">Register here</Typography></NavLink>

                    </Grid>
                <Grid item>
                <Button type="submit" sx={{backgroundColor:"white", color:"black",borderColor:"black"}} size='small' variant='outlined'>Login</Button>
                <Button size="small" style={{ color:"white",borderColor:"white", marginLeft:"10px",fontWeight:"600" }} onClick={()=>dispatch(toggleModel())} variant='outlined'>Cancel</Button>
                </Grid>
                </Grid>

            </form>
        </>
    )
}

export default LoginForm