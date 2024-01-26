import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

function ProductCard(props) {
  const hovereffect={
    
  }
   const {product}=props
  return (
   <>
   <Grid container md={12} spacing={3}>

   {
    product && product.map((item)=>{
        return(
            <>
            <Grid item >
            <Paper elevation={1} >
            <NavLink to={`/dashboard/admin/product/singleProduct/${item.slug}`} style={{textDecoration:"none"}}>

            <Card  sx={{ width: 200,marginTop:"20px"}}>
            {/* <CardMedia
              sx={{ height: 230, marginTop:"10px" }}
              image={`/api/product/photo/${item._id}`}
              title="green iguana"
            /> */}
            <img src={`/api/product/photo/${item._id}`} height={props.height} width={props.width} alt="" />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" style={{whiteSpace:"nowrap"}}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{}}>
               {item.description.slice(0,40) }...
              </Typography>
              <Typography variant="body2" color="text.secondary"  style={{marginTop:"10px",color:'black',fontWeight:"900"}}>
              &#8377;  {item.price}
              </Typography>
            </CardContent>
           
          </Card>
            </NavLink>
            </Paper>
            </Grid>
            </>
        )
    })
   }
   
   </Grid>
 
   </>
  )
}

export default ProductCard