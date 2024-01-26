import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProductCard from './ProductCard'

function Product() {
    const [products,setProducts]=useState()

    const getproducts=async ()=>{
        await axios.get("/api/product/productList").then(res=>{
            if(res.data.status==true){
                setProducts(res.data.data)
            }
        }).catch(err=>toast.error("something went wrong"))
    }
    useEffect(()=>{
        getproducts()
    },[])
  return (
  <>
    <Grid container spacing={2}>
    <Grid item md={2} >
          <Sidebar />
        </Grid>
        <Grid item  md={10}>
       <ProductCard   product={products}  width="200px" height="150px"/>
        </Grid>
    </Grid>
  </>
  )
}

export default Product