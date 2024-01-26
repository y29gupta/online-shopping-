import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Loader = () => {
    const [count,setCount]=useState(3)
    const navigate=useNavigate()

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prevState)=> --prevState)
        },1000)
        count===0 && navigate('/')
        return ()=>{
            clearInterval(interval)
        } 

    },[count]) 
  return (
   <>
    <Box sx={{border:"2px solid green",height:"100vh",backgroundColor:"rgb(0, 0, 0,0.1)"}}>
        <Box sx={{ position:"absolute",top:"50%",left:'50%',color:"black", transform:"translate(-50%,-50%)"}}>
        <Typography variant="h6" component="p" sx={{color:"white"}} > Redirecting you in {count}</Typography>
        <CircularProgress size="2rem" sx={{color:"white",ml:"10rem"}}/>
        </Box>
    </Box>
   </>
  )
}

export default Loader 