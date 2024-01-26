import { FormControl, Grid, InputLabel, NativeSelect, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function OrderList() {
    const { token } = useSelector(state => state.user.userData)
    const [order, setOrder] = useState()
    const [status,setStatus]=useState(['No processing','processing','shipped','delivered','cancel'])

    const gettotalOrder = async () => {
        await axios.get(`/api/product/totalorders`, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            setOrder(res.data.order)
        })
    }
    useEffect(() => {
        gettotalOrder()
    }, [order])

    const handlestatus = async (e,id)=>{
        
        await axios.put('/api/product/updatestatus',{status:e.target.value,id:id},{
            headers:{
                Authorization:token
            }
        }).then(res=>{
            toast.success(" status changed successfully")
        }).catch(err=>console.log(err,"err22"))
    }
    return (
        <>
            <Grid container>
                <Grid item md={2} >
                    <Sidebar />
                </Grid>
                <Grid item md={10}>
                    <TableContainer component={Paper} elevation={5}>
                        <Table size='small' sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"> <Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Product </Typography> </TableCell>
                                    {/* <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}> Category</Typography></TableCell> */}
                                    <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Description</Typography></TableCell>
                                    <TableCell align="center"> <Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}> Price(&#8377;)</Typography></TableCell>
                                    <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Product Image</Typography></TableCell>
                                    <TableCell align="center"><Typography component="p" sx={{ fontSize: "16px", fontWeight: "bold" }}>Status</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order?.map((item) => {
                                    return (
                                        <>
                                            {
                                                item.products?.map(row => {
                                                    return (
                                                        <>

                                                            <TableRow
                                                                key={row?.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row?.name}
                                                                </TableCell>
                                                                {/* <TableCell align="center">{row?.category?.name}</TableCell> */}
                                                                <TableCell align="center">{row?.description?.substring(0, 60)}</TableCell>
                                                                <TableCell align="center"> &#8377; {row?.price?.toLocaleString()}</TableCell>
                                                                <TableCell align="center">
                                                                    <NavLink to={`/product-details/${row?.slug}`}>

                                                                        <img src={`/api/product/photo/${row._id}`} alt="" width="60px" height="60px" />
                                                                    </NavLink>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <FormControl fullWidth>
                                                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                                            Age
                                                                        </InputLabel>
                                                                        <NativeSelect
                                                                            defaultValue={item.status}
                                                                            inputProps={{
                                                                                name: 'age',
                                                                                id: 'uncontrolled-native',
                                                                            }}
                                                                            onChange={(e)=>handlestatus(e,item._id)}
                                                                        >
                                                                            {
                                                                                status.map(item=>{
                                                                                    return(
                                                                                        <>
                                                                                        
                                                                                        <option value={item}>{item}</option>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                           
                                                                        </NativeSelect>
                                                                    </FormControl>
                                                                </TableCell>

                                                            </TableRow>
                                                        </>
                                                    )
                                                })
                                            }

                                        </>

                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default OrderList