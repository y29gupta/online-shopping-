import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'

function SearchComponent() {
    const {searchedProduct}=useSelector(state=>state.product)
   
  return (
  <>
  <Grid container mt={2}  md={12} >
  
    {
        searchedProduct?.map((item)=>{
            return(
                <>
                <Grid  md={3} >
                <ProductCard data={item} height="175px" width="190px"/>
                </Grid>
                </>
            )
        })
    }
   
  </Grid>
  </>
  )
}

export default SearchComponent