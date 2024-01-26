import { Backdrop, Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import './style.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../redux/features/productSlice'
import CircularProgress from '@mui/material/CircularProgress';



function AddProduct() {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  const handleClose = () => {
    setOpen(false);
  };


  const { loading } = useSelector(state => state.product)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    photo: '',
    name: "",
    price: "",
    description: '',
    quantity: "",
    category: ""

  })
  const getcategoryList = async () => {
    await axios.get('/api/category/category_list').then(res => {
   
      if (res.status == 200) {
        setCategories(res.data.categoryList)
        setProduct({ ...product, category: res.data.categoryList[0]._id })
        setCategory(res.data.categoryList[0]._id)
      }
    }).catch(err => toast.warning(err.message))
  }
  useEffect(() => {
    getcategoryList()
  }, [])
  useEffect(() => {
  }, [product])

  const handlechange = (e) => {
    e.preventDefault()
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleimage = (e) => {
  
    setProduct({ ...product, [e.target.name]: e.target.files[0] })

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const formdata = new FormData()
    formdata.append("name", product.name)
    formdata.append("description", product.description)
    formdata.append("price", product.price)
    formdata.append("quantity", product.quantity)
    formdata.append("photo", product.photo)
    formdata.append("category", product.category)
    dispatch(addProduct(formdata))

  }
  return (
    <>
      <Grid container>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10} sx={{ backgroundColor: "rgba(22,22,22,0.3)" }}>
          {/* <Paper elevation={4} style={{margin:"auto"}} > */}
          <Typography m={2} sx={{ border: "2px solid black", color: "white", backgroundColor: "black" }} textAlign="center" variant='h5'>Add Product</Typography>
          <Box m="auto" maxWidth="60%" sx={{ mt: "20px" }} >

            <form action="" >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={product.category && product.category}
                  size='small'
                  name='category'
                  label="Select Category"
                  onChange={handlechange}
                >
                  {
                    categories && categories.map(item => {
                      return (
                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                      )
                    })
                  }

                </Select>
              </FormControl>
              <TextField autoComplete='off' variant='outlined' label="Product Name" value={product.name} onChange={handlechange} name='name' sx={{ marginTop: "10px" }} size="small" fullWidth />
              <textarea style={{ minWidth: "99%", marginTop: "10px", height: "50px" }} name='description' aria-label="minimum height" rows={10} onChange={handlechange} placeholder="Product Description" />
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                <TextField type='number' variant='outlined' name='quantity' label="Quantity" sx={{ marginTop: "10px" }} size="small" onChange={handlechange} />
                <TextField variant='outlined' label="&#8377;" type='number' name='price' style={{ marginTop: "10px", marginLeft: "auto" }} onChange={handlechange} size="small" />
              </Box>
              <label style={{ padding: "10px" }}>
                <input type="file" style={{ marginTop: "10px" }} accept='image/*' name='photo' onChange={(e) => { handleimage(e) }} className='custom-file-input' />

              </label>
              <Box sx={{ mt: "20px", mb: "20px" }}>
                {
                  product.photo && (
                    <img src={URL.createObjectURL(product.photo)} height="200px" width="200px" alt="" />
                  )
                }
              </Box>
              <Box mb={5}>

                <Button onClick={handleSubmit} fullWidth size='small' variant='contained' >Create Product</Button>
              </Box>
            </form>

          </Box>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>


        </Grid>
      </Grid>
    </>
  )
}

export default AddProduct