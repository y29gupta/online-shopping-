
import { Backdrop, Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
// import { NavLink } from 'react-router-dom'
import './style.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, updateProduct } from '../../redux/features/productSlice'
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom'



function UpdateProduct() {
 
  const [open, setOpen] = useState(false);
  const params = useParams()

  const handleClose = () => {
    setOpen(false);
  };


  const { loading } = useSelector(state => state.product)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [qty, setQty] = useState('')
 
  const [name,setName]=useState('')
  const [description,setDescription]=useState()
  const [price,setPrice]=useState()
  const dispatch=useDispatch()
  const [photo,setPhoto]=useState()
  const [id,setId]=useState()
 
  const getcategoryList = async () => {
    await axios.get('/api/category/category_list').then(res => {

      if (res.status == 200) {
        setCategories(res.data.categoryList)
       
      }
    }).catch(err => toast.warning(err.message))
  }

  const singleProduct = async () => {
    await axios.get(`/api/product/singleProduct/${params.slug}`).then(res => {
      const result = res.data.data

      // setProduct({  name: result?.name, description: result?.description, price: result?.price, category: result?.category })
      setName(result?.name)
      setPrice(result?.price)
      setDescription(result?.description)
      setCategory(result?.category._id)
      setQty(result?.quantity)
      setId(result?._id)

    })
  }

  useEffect(() => {
    singleProduct()
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    getcategoryList()
    //eslint-disable-next-line
  }, [])
  // useEffect(() => {
  // }, [product])

  const handlechange = (e) => {
    e.preventDefault()
    // setProduct({ ...product, [e.target.name]: e.target.value })
    setCategory(e.target.value)
  }

  const handleimage = (e) => {
    // setProduct({ ...product, [e.target.name]: e.target.files[0] })
    setPhoto(e.target.files[0])


  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("description", description)
    formdata.append("name", name && name)
    formdata.append("price", price)
    formdata.append("quantity", qty)
    photo && formdata.append("photo", photo)
    formdata.append("category", category)
  
    dispatch(updateProduct({id,formdata}))
   



  }

  const handleDelete=async(id)=>{
    const ans=window.confirm("Are you sure you want to delete this product")
    if(ans){
      await axios.delete(`/api/product/delete/${id}`).then(res=>{
        if(res.data.status=true){
          toast.success(res.data.msg)
          window.location.href='/dashboard/admin/product'
        }
      }).catch(err=> toast.error("something went wrong"))

    }
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={2} >
          <Sidebar />
        </Grid>
        <Grid item md={10} sx={{ backgroundColor: "rgba(22,22,22,0.3)" }}>

          <Typography m={2} sx={{ border: "2px solid black", color: "white", backgroundColor: "black" }} textAlign="center" variant='h5'>Update Product</Typography>
          <Box m="auto" maxWidth="60%" sx={{ mt: "20px" }} >

            <form action="" >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category && category}
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
              <TextField autoComplete='off' variant='outlined' placeholder='Product name' value={name} onChange={(e)=>setName(e.target.value)} name='name' sx={{ marginTop: "10px" }} size="small" fullWidth />
              <textarea style={{ minWidth: "99%", marginTop: "10px", height: "50px" }} value={description} name='description' aria-label="minimum height" rows={10} onChange={(e)=>setDescription(e.target.value)} placeholder="Product Description" />
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Box>

                <TextField type='number' variant='outlined' name='quantity' value={qty && qty} label="Quantity" sx={{ marginTop: "10px" }} size="small" onChange={(e)=> setQty(e.target.value)} />
           
                    </Box>
                    <Box>

                <TextField variant='outlined' label="&#8377;" type='number' name='price' style={{ marginTop: "10px", marginLeft: "auto" }} onChange={(e)=>setPrice(e.target.value)} value={price} size="small" />
                    </Box>
              </Box>
              <label style={{ padding: "10px" }}>
                <input type="file" style={{ marginTop: "10px" }} accept='image/*' name='photo' onChange={(e) => { handleimage(e) }} className='custom-file-input' />

              </label>
              <Box sx={{ mt: "20px", mb: "20px" }}>
                {
                  photo ? (
                    <img src={URL.createObjectURL(photo)} height="200px" width="200px" alt={name} />
                  ):(
            <img src={`/api/product/photo/${id}`} height="250px" width="250px" alt="" />
                    
                  )
                }
              </Box>
              <Box mb={5}>

                <Button fullWidth size='small' onClick={handleUpdate} variant='contained' >Create Product</Button>
                <Button  fullWidth sx={{mt:"10px",backgroundColor:"red"}} size='small' onClick={()=>handleDelete(id)} variant='contained' >Delete Product</Button>
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

export default UpdateProduct