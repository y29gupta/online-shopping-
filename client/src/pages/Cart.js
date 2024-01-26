import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';
import { toggleModel } from '../redux/features/user/userSlice';
import axios from 'axios';
import { cartTotalItem, decreaseItemQty, increaseItemQty, removecart, totalItemPrice } from '../redux/features/productSlice'
import ProductListTable from '../component/ProductListTable';
import CartToggleAmount from '../component/CartToggleAmount';




function Cart() {
    const { cart,totalPrice ,totalItem,shippingCharge} = useSelector(state => state.product)
    const { userInfo, token } = useSelector(state => state.user.userData)
    const [total, setTotal] = useState('')

   
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const discount = 30
    
    
    
    // const totalPrice = () => {
        //     let total = 0
        //     cart?.map(item => { total = total + item.price })
        //     setTotal(total)
        // }
        
        useEffect(() => {
            // totalPrice()
            dispatch(totalItemPrice())
            dispatch(cartTotalItem())
        
    }, [totalPrice,totalItem])

  

    const removeitem = (id) => {
        const cartitem = [...cart]
        const index = cartitem.findIndex(item => item._id === id)
        cartitem.splice(index, 1)
        toast.success('one item removed')

        localStorage.setItem('cart', JSON.stringify(cartitem))
        window.location.reload()
    }

    const checkouthandle=async (price)=>{
        
       const data= await axios.get("/api/product/get_api_key")
    //    console.log(totalPrice,"pr")
       let totalPrice=price+shippingCharge
        await axios.post("/api/product/checkout",{totalPrice}).then(res=>{
        let response=res.data.order
            var options = {
                key:data.data.key, // Enter the Key ID generated from the Dashboard
                amount: response.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Add To Cart.com",
                description: "marathalli bangalore",
                image: "logo.png",
                order_id: response.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                // callback_url: "/api/product/payment_verify",
                // prefill: {
                //     name: userInfo?.name,
                //     email: userInfo?.email,
                //     contact: userInfo?.phone
                // },
                handler:function(response){

                    axios.post(`/api/product/payment_verify`,{response,cart},{
                        headers:{
                            Authorization:token
                        }
                    }).then(res=>{
                        dispatch(removecart())
                        window.location.href="/"
                        toast.success("Order placed successfully")
                    })

                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#19191A"
                }
            };
            var rzp1 = new window.Razorpay(options);
           
                rzp1.open();
            
        }).catch(err=>console.log(err,"error"))
    }

    
//     const setDecrease=()=>{
//         // amount>1?setAmount(amount-1):setAmount(1)
// }
// const setIncrease=()=>{
//     // amount<product.quantity? setAmount(amount+1):setAmount(product.quantity)
//     console.log('clikc')
// }
    return (
        <>
            <Grid container spacing={4}>
                <Grid item md={7} >
                    {
                        cart?.length > 0 ? (
                            <>
                                <Box sx={{ marginTop: "20px", backgroundColor: "black", color: "white", marginBottom: "20px" }}><Typography variant='h5' textAlign="center">Your cart has {cart?.length} products</Typography></Box>

                                <TableContainer component={Paper} elevation={5}>
                                    <Table size='small' sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"> <Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Product </Typography> </TableCell>
                                                <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Price (&#8377;)</Typography></TableCell>
                                                <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}> Quantity</Typography></TableCell>
                                                <TableCell align="center"> <Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}> Subtotal(&#8377;)</Typography></TableCell>
                                                <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Product Image</Typography></TableCell>
                                                <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Action</Typography></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cart?.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row?.name}
                                                    </TableCell>
                                                    <TableCell align="center">&#8377;{row?.price.toLocaleString()}</TableCell>
                                                    <TableCell align="center">
                                                        <CartToggleAmount  
                                                        amount={row?.amount}
                                                        setIncrease={()=>{dispatch(increaseItemQty(row?._id))
                                                            dispatch(cartTotalItem())
                                                        } }
                                                        setDecrease={()=>{dispatch(decreaseItemQty(row?._id))
                                                        dispatch(cartTotalItem())
                                                        }
                                                        }
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center"> &#8377; {(row?.price*row?.amount).toLocaleString()}</TableCell>
                                                    <TableCell align="center">
                                                        <NavLink to={`/product-details/${row?.slug}`}>

                                                            <img src={`/api/product/photo/${row._id}`} alt={row.name} width="60px" height="60px" />
                                                        </NavLink>
                                                    </TableCell>
                                                    <TableCell align="center"> <IconButton onClick={() => removeitem(row._id)}> <DeleteForeverIcon size="inherit" sx={{ color: "red", fontSize: "30px" }} /> </IconButton> </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <ProductListTable product={cart}/> */}
                            </>
                        ) : (
                            <Box sx={{ marginTop: "20px", backgroundColor: "black", color: "white" }}><Typography variant='h5' textAlign="center">Cart is Empty</Typography></Box>

                        )
                    }
                </Grid>
                <Grid item md={5} xs={12}>
                    <Box sx={{ marginTop: "20px", marginRight: "10px" }}>

                        <Paper>
                            <Card>
                                <CardHeader
                                    title="Price Details"

                                />
                                <hr />
                                <CardContent>
                                    <Box>
                                        <Typography sx={{ display: "inline-block" }}>Price ({totalItem} items) </Typography>
                                        <Typography style={{ float: 'right' }}> &#8377; {totalPrice?totalPrice.toLocaleString():0}  </Typography>
                                        <Typography style={{ marginTop: "10px" }}> Delivery Charge <span style={{ float: "right" }} >  &#8377; {totalPrice && shippingCharge}</span> </Typography>
                                        <hr />
                                        <Typography style={{ marginTop: "10px", fontWeight: "bold" }}> Total Amount <span style={{ float: "right" }} >  &#8377; {totalPrice ? (totalPrice+shippingCharge).toLocaleString() : 0}</span> </Typography>
                                    </Box>

                                </CardContent>
                                <CardActions>
                                    {
                                        token ? (
                                            <>
                                                <Box sx={{ width: "100%", wordWrap: "break-word" }}>
                                                    <Typography component="p"> <span style={{ fontWeight: "bold" }}>Address: </span> {userInfo?.address}</Typography>
                                                    {/* <Button onClick={() => navigate('/dashboard/user/profile')} size='small' variant='contained' sx={{ marginTop: "10px", backgroundColor: "#ff9f00", marginLeft: "auto", fontWeight: "600", color: "black" }}>Update address</Button> */}
                                                </Box>

                                            </>
                                        ) : (
                                            <>
                                                <Button onClick={() => dispatch(toggleModel('/cart'))} variant='contained' sx={{ margin: "auto", backgroundColor: "#ff9f00", color: "black", fontWeight: "600" }}>Login To Checkout</Button>
                                            </>
                                        )
                                    }
                                </CardActions>
                            </Card>
                          
                        </Paper>
                        {
                                token?(

                                <Box  style={{ marginTop:"20px",display:'flex',justifyContent:"center"}}>
                                    <Button variant='contained' style={{backgroundColor:'#fb641b'}} onClick={()=>checkouthandle(totalPrice && totalPrice)}>Pay Now</Button>
                                </Box>
                                ):""
                            }
                       
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Cart