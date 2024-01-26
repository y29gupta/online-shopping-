import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UserSidebarMenu from './UserSidebarMenu'
import ProductListTable from '../../component/ProductListTable'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Orders() {
  const {token}=useSelector(state=>state.user.userData)
  const [order,setOrder]=useState()

  const userOrderPlaced = async () => {
    await axios.get(`/api/product/getorders`,{
      headers:{
        Authorization:token
      }
    }).then(res => {
      // console.log(res?.data?.order, "orders")
        setOrder(res?.data?.order)
    }).catch(err=>{
      console.log(err,"err")
      toast.warning(err)
    })
  }

  useEffect(() => {
    userOrderPlaced()

  }, [])
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={2}>
          <UserSidebarMenu />
        </Grid>
        <Grid item md={10} >
          <Box style={{margin:"1rem"}}>

          <ProductListTable product={order?order:[]} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Orders