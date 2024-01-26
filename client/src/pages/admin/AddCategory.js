import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import TableContainer from '@mui/material/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../redux/features/categorySlice';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { deleteCategory } from '../../../../controller/categoryController';

function AddCategory() {
  // const dispatch = useDispatch()
  const { data } = useSelector(state => state.category)
  const [list, setList] = useState()
  const [category, setCategory] = useState()
  const { token } = useSelector(state => state.user.userData)
  const [updatemodel, setUpdatemodel] = useState(false)
  const [updatevalue, setUpdatevalue] = useState()
  const [selected,setSelected]=useState(null)


  const style = { 
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  useEffect(() => {

    const categoryList = async () => {
      try {
        await axios.get("/api/category/category_list",).then(res => {

          setList(res.data.categoryList)
        }).catch(err => toast.warning("got some error"))

      }
      catch (err) {
        return toast.error("not runing")
      }
    }
    categoryList()


  }, [list])

  const handlechange = (e) => {
    setCategory(e.target.value)
  }

  const submitCategory = async () => {
    const data = {
      name: category
    }
    await axios.post("/api/category/add", data, {
      headers: {
        Authorization: token
      }
    }).then(res => {
      // window.reload()
      toast.success(res.data.msg)
      setCategory("")
    }).catch(err => console.log(err, "error"))
  }

  const handleedit = (e, data) => {
    setUpdatemodel(true);
    setSelected(data)
   
    setUpdatevalue(data.name)
  }
  const handleClose = () => setUpdatemodel(false);

  const handleupdate=(e)=>{
    e.preventDefault()
    setUpdatevalue(e.target.value)

  }

  const updatecategory= async(id)=>{
    
      await axios.put(`/api/category/update/${selected._id}`,{name:updatevalue},{
        headers:{
          Authorization:token
        }
      }).then(res=>{
        if(res.status=200){

          toast.success(res.data.msg)
        
          handleClose()
        }else{
          toast.warning(res.data.msg )
        }
        // categoryList()
      }).catch(err=>{
        console.log(err,'err')

        toast.error('Something went wrong')
       
      })
  }

  const deleteCategory=async (id)=>{
   const status= window.confirm("Are you sure you want to delete this category?")
   if(status){
      await axios.delete(`/api/category/deleteCategory/${id}`).then(res=>{
       
        if(res.status=200){
          toast.success(res.data.msg)
        }
      })
   }
  }

  return (
    <>
      <Grid container>
        <Grid item md={2} >
          <Sidebar />
        </Grid>
        <Grid item mt={3} ml={1} md={4}>
          <Box sx={{ opacity: "0.9", mb: 2 }} >

            <form action=""  >
              <Box >

                <TextField onChange={(e) => handlechange(e)} value={category} style={{ marginTop: "20px", marginLeft: "20px", backgroundColor: "white" }} placeholder='Add category' type='text' size="small" />
                <Button onClick={submitCategory} style={{ marginTop: "20px", marginLeft: "20px", backgroundColor: "black" }} variant="contained" >Add Category</Button>
              </Box>
            </form>


          </Box>

          <TableContainer sx={{ mb:2}} component={Paper}>
            <Table size='small' aria-label="simple table" >
              <TableHead sx={{ backgroundColor: "gray" }}>
                <TableRow>
                  <TableCell component="td" colSpan="1" style={{ textAlign: "left" }} > <Typography variant='h6' component="p">Category</Typography> </TableCell>
                  <TableCell component="td" colSpan="2" style={{ textAlign: "center" }} align="right"> <Typography variant='h6' component="p">Action</Typography> </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {list && list.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell> <Button variant='contained' size='small' sx={{backgroundColor:"orange"}} onClick={(e) => { handleedit(e, row ) }}>Edit</Button> </TableCell>
                    <TableCell> <Button sx={{backgroundColor:"red"}} variant='contained' onClick={()=>deleteCategory(row._id)} size='small'>Delete</Button> </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            keepMounted
            open={updatemodel}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}> 
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
               Update Category
              </Typography>
              <form action="">
              <Box>
                <TextField onChange={(e) => handleupdate(e)} style={{ marginTop: "20px", marginLeft: "20px", backgroundColor: "white" }}value={updatevalue} placeholder='Add category' type='text' size="small" />
                <Button onClick={updatecategory} style={{ marginTop: "20px", marginLeft: "20px", backgroundColor: "green" }} variant="contained" >Add </Button>
              </Box>
            </form>
            </Box>
          </Modal>
          {/* ) */}
        </Grid>
      </Grid>
    </>
  )
}

export default AddCategory