import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../component/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, cartTotalItem, totalItemPrice } from '../redux/features/productSlice'
import { toast } from 'react-toastify'
import CartToggleAmount from '../component/CartToggleAmount'

function ProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState()
    const [relatedProduct,setRelatedProduct]=useState([])
    const navigate=useNavigate()
    const {cart}=useSelector(state=>state.product)
    const dispatch= useDispatch()
    const [amount,setAmount]=useState(1)

    const setDecrease=()=>{
            amount>1?setAmount(amount-1):setAmount(1)
    }
    const setIncrease=()=>{
        amount<product.quantity? setAmount(amount+1):setAmount(product.quantity)
    }
    const getProductDetails = async () => {
        if (params.slug)
            await axios.get(`/api/product/singleProduct/${params?.slug}`).then(res => {
              let data=res.data.data
                setProduct(data)
                getsimilerProduct(data._id,data.category._id)
            }).catch(err => console.log(err, "error"))
    }

    const getsimilerProduct=async (pid,cid)=>{
        await axios.get(`/api/product/similerProduct/${pid}/${cid}`).then(res=>{
            setRelatedProduct(res.data.data)
        }).catch(err=>console.log(err,"error"))
    }

    useEffect(() => {
        getProductDetails()
    }, [params])

    const handleCart= async (product,amount)=>{
        // const itemInCart=cart.some(item=>item._id===product._id)
        // if(itemInCart){
        //     toast.warning("item already in the cart")
        // }else{
            
            dispatch( addToCart({product,amount}) )
            dispatch(cartTotalItem())
        // }
    }
    // useEffect(()=>{
    //     dispatch(totalItemPrice())
    // },[])
    return (
        <>
            <Grid container spacing={5} mt={1} mb={2}>
                <Grid item md={4} >
                    <Box  >
                        <Paper   elevation={1} >


                            <img src={`/api/product/photo/${product?._id}`} height="350px" width="380px" alt="" />
                            <Box mt={2} display="flex" justifyContent="space-around" style={{marginBottom:"10px"}}>

                                <div>
                                    <Button  variant='contained'   sx={{ backgroundColor: "orange",width:"150px" }} onClick={()=>navigate('/cart')}>Buy Now</Button>
                                </div>
                                <div >
                                    <Button onClick={()=>handleCart(product,amount)}   variant='contained' sx={{ backgroundColor: "#FF5733",width:"150px" }} >Add To Cart</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item md={8} >
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant='h6' component="p"  color="text.primary" gutterBottom>
                              {product?.name}
                            </Typography>
                           
                            <Typography  component="p" sx={{fontSize:"14px",fontWeight:"bold"}} color="text.primary" gutterBottom>
                              Category - {product?.category.name}
                            </Typography>
                            <Box display="flex">
                            <Typography sx={{marginRight:"10px",fontWeight:"bold"}} color="text.secondary">
                            
                             Description
                            </Typography>
                            <Typography component="p" sx={{fontSize:"14px"}}>
                                  {product?.description}
                            </Typography>
                            </Box>
                            <Typography component="p" sx={{fontSize:"14px",fontWeight:"bold"}}>
                                  Availability:{product?.quantity>0? ( <span>In Stock</span> ):( <span style={{color:"red"}}>Out of Stock</span> )}
                            </Typography>
                            <Typography component="p" sx={{fontSize:"14px",color:"green",fontWeight:"bold"}}>
                                  Product Price
                            </Typography>
                            <Typography variant='h5' component="p" sx={{fontWeight:"bold"}}>
                            &#8377;  {product?.price.toLocaleString()}
                            </Typography>
                        </CardContent>
                        <CartToggleAmount 
                        amount={amount} 
                        setDecrease={setDecrease} 
                        setIncrease={setIncrease} 
                        />
                    </Card>
                </Grid>
                
            </Grid>
                <Paper elevation={5}>
            <Grid sx={{marginTop:"10px"}} container spacing={4}>

                {
                    relatedProduct?.map(item=>{
                        return(

                <Grid   item md={2} key={item._id}>
                        <div>
                            <ProductCard height="150px" width="175px" data={item}/>
                        </div>
                </Grid>
                        )
                    })
                }
            </Grid>
                </Paper>
        </>
    )
}

export default ProductDetails