import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


function ProductCard(props) {
    const navigate = useNavigate()
    return (
        <>

            <NavLink to={`/product-details/${props.data.slug}`} style={{ textDecoration: "none" }}>

                <Card sx={{ width: props.width, marginTop: "20px", marginBottom: '10px' }}>

                    <img src={`/api/product/photo/${props.data._id}`} height={props.height} width={props.width} alt="" />
                    <CardContent>
                        <Typography gutterBottom component="p" style={{ whiteSpace: "nowrap" }}>
                            {props.data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{}}>
                            {props.data.description.slice(0, 30)}...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ marginTop: "10px", color: 'black', fontWeight: "900" }}>
                            &#8377;  {props.data.price}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                    <div>

                        <Button onClick={()=>{navigate(`/product-details/${props.data.slug}`)}} variant='outlined' sx={{ backgroundColor: "green", color: "white" }} size='small'>View</Button>
                    </div>
                    <div style={{ marginLeft: "auto" }}>

                        <Button size='small' variant='contained' sx={{ backgroundColor: "orange" }} >Add To Cart</Button>
                    </div>
                </CardActions> */}

                </Card>
            </NavLink>
        </>
    )
}

export default ProductCard