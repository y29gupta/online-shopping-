import { Button, IconButton, Typography } from '@mui/material'
import React from 'react'

function CartToggleAmount({amount,setDecrease,setIncrease}) {
  return (
   <>
   <div style={{display:"flex"}}>
    <Button onClick={()=>setDecrease()}  style={{fontSize:"20px",color:"black",paddingRight:"10px"}}>-</Button>
   <Typography sx={{lineHeight:"50px"}}>{amount}</Typography>
    <Button  onClick={()=>setIncrease()} style={{fontSize:"20px",color:"black"}}>+</Button>
   </div>
   </>
  )
}

export default CartToggleAmount