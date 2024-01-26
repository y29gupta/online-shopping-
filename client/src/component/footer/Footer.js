import { Grid, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (
        <>

            <Grid container
            //  backgroundColor="secondary.main"
            style={{
backgroundColor:"black"
    // background: "linear-gradient(90deg, rgba(63,54,213,0.7399334733893557) 0%, rgba(246,245,249,1) 100%)",
    // background: "linear-gradient(100deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.3841911764705882) 30%, rgba(0,212,255,0.6) 80%)"

            }}
              justifyContent='center'>
                <Grid item lg={3} >

                    <img src="./logo.png" style={{ margin: '20px 50px', width: "120px", height: "80px" }} alt="" />

                </Grid>
                <Grid item lg={3} >
                    <Typography color="white" p={1} component='p'>Marathahali-Sarjapur Outer Ring Road, <br />Devarbisanhali,Bellandur,Bengaluru, <br /> Karnataka 560103</Typography>
                </Grid>
                <Grid item lg={3} >
                    <Typography variant='h6' component='p' color='white' p={1} fontWeight='900'>+91 9876543210 </Typography>
                    <Typography color='white' p={1} component='p' >info@example.com </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer