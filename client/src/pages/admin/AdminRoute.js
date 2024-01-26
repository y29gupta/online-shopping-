import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Navigate, Redirect, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../component/Loader'


function AdminRoute(props) {

    const user = useSelector(state => state.user.userData)
    const [status, setStatus] = useState(false)

    useEffect(() => {

        const authcheck = async () => {
            const response = await axios.get('/api/auth/admin-auth', {
                headers: {
                    'authorization': user?.token
                }
            }).then(res => {

                if(res.data.status===true){
                    setStatus(true)
                }
            })
                .catch(err => console.log(err,'errr'))
        }
        if (user?.token) authcheck()
    }, [user?.token])

    return status ? <Outlet /> : <Loader />

}

export default AdminRoute