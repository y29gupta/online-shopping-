import * as React from 'react';

import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModel } from '../../redux/features/user/userSlice';
import LoginForm from './LoginForm';
import { Backdrop, Paper } from '@mui/material';
import RegisterForm from './RegisterForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color:"white",
    backgroundColor:"black",
    // background: "linear-gradient(150deg, rgba(63,54,213,0.7399334733893557) 0%,  rgba(0,212,255,0.6) 100%)",
    opacity:"0.9",
    boxShadow: 24,
    p: 2,
};

export default function ModelForm() {
    const [register,setRegister]=React.useState(false)
    const {path}=useSelector(state=>state.user)
    const handleClose = () => {
        dispatch(toggleModel())
        setRegister(false)
    };
    const dispatch = useDispatch()
    const toggleform = useSelector(state => state.user.toggleform)
   
    return (
        <div>

            <Modal
                open={toggleform}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Paper   sx={style}>
                    {
                        register?<RegisterForm registerState={setRegister}/>:<LoginForm path={path} registerState={setRegister}/>
                    }

               {/* <LoginForm   /> */}
                </Paper>
            </Modal>
        </div>
    );
}