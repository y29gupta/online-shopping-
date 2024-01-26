import { Backdrop, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModel, userRegister } from '../../redux/features/user/userSlice'
import { toast } from 'react-toastify'


const inputlist = [
    {
        name: "name",
        type: "text",
        label: "name"
    },
    {
        name: "email",
        type: "email",
        label: "email"
    },
    {
        name: "password",
        type: "password",
        label: "password"
    },
    {
        name: "phone",
        type: "text",
        label: "phone"
    },
    {
        name: "address",
        type: "text",
        label: "address"
    }
]
const loginSchema = yup.object().shape({
    name: yup.string('should be string').required("Name is required"),
    email: yup.string('Should be a string').required('Email is required').email("Invalid email"),
    password: yup.string("should be string").required("password is required"),
    phone: yup.string('should be string').required("Mobile number is required"),
    address: yup.string('should be string').required("Address is required"),


})
function RegisterForm(props) {
    const { loading, status } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const closemodel = () => {
        dispatch(toggleModel())

        props.registerState(false)
    }

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "", phone: "", address: "" },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            dispatch(userRegister(values))
            if (status == true) {
                props.registerState(false)
            }
        }
    })
    return (
        <>
            <>
                <Box sx={{backgroundColor:"white"}}>
                    <Typography variant="h5" style={{ color: "red", fontFamily: "Stylish", textAlign: "center" }} >Add <span style={{ color: "yellow" }} >To</span> Cart.com</Typography>
                    <Typography variant='h6' sx={{ color: "primary.main", fontWeight: "600", textAlign: "center" }}>User Register</Typography>

                </Box>
                <form autoComplete='off' onSubmit={formik.handleSubmit}>
                    {
                        inputlist.map((input) => {
                            let isError = formik.touched[input.name] && Boolean(formik.errors[input.name])
                            return (
                                <>
                                    <Box mt={2} mb={2} key={input.name}>

                                        <TextField
                                            label={input.label}
                                            variant='filled'
                                            fullWidth
                                            type={input.type}
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

                    <Grid container justifyContent="end">

                        <Grid item>


                            <Button sx={{backgroundColor:"white", color:"black",borderColor:"black"}} type="submit" size='small' variant='contained'>Register</Button>
                            <Button size="small" style={{color:"white",borderColor:"white", marginLeft: "10px", fontWeight: "600" }} onClick={closemodel} variant='outlined'>Cancel</Button>
                        </Grid>

                    </Grid>
                    {
                        loading ? <CircularProgress sx={{ ml: "auto" }} color="inherit" /> : ""
                    }


                </form>

            </>
        </>
    )
}

export default RegisterForm