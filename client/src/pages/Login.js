import React, { useEffect, useState } from 'react'
import ModelForm from '../component/model/ModelForm'
import { useDispatch } from 'react-redux'
import { toggleModel } from '../redux/features/user/userSlice'
import { Box, Button, Modal, Paper, Typography } from '@mui/material'
import LoginForm from '../component/model/LoginForm'
import WarningIcon from '@mui/icons-material/Warning';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "primary.light",
  opacity: "1",
  boxShadow: 24,
  p: 2,
};
function Login() {
  
  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false)
  };

const handleclick=()=>{
dispatch(toggleModel())
handleClose()
}
  const [open, setOpen] = useState(true)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Paper sx={style}>
          <Box sx={style}>
          <WarningIcon />
            <Typography id="modal-modal-title" variant="h6" component="p">
            
               Please login to continue your shopping
            </Typography>
            <Button variant="outlined" sx={{marginTop:"20px"}} onClick={handleclick}>Go to Login page</Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}

export default Login