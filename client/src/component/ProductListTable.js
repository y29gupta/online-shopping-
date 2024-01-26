import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function ProductListTable(props) {
   
    const [orders, setOrders] = useState()
    useEffect(() => {

        setOrders(props.product)
    }, [props.product])
    return (
        <>
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
                        {orders?.map((item) => {
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
                                                        <TableCell align="center"><Typography commponent="p" style={{fontWeight:"600"}}>{item?.status}</Typography>  </TableCell>

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
        </>
    )
}

export default ProductListTable