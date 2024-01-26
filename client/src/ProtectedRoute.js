import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './component/Loader'
import { toast } from 'react-toastify'


function ProtectedRoute(props) {
    const user=useSelector(state=>state.user.userData)


    // return (
    //     props.auth ? props.children :  <Navigate  to={`/login`} />
    // )
const [status,setStatus]=useState(false)

useEffect(()=>{

    const authcheck= async()=>{
            const response=await axios.get('/api/auth/user-auth',{
                headers:{
                    'authorization': user?.token
                }
            })
            if(response.data.status===true){
                setStatus(true)
            }
    }
        if(user?.token ) {

            authcheck()
        }
   
},[user?.token])
    
return status? <Outlet/>:<Loader/>
}

export default ProtectedRoute