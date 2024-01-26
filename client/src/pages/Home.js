import { Box, Button,  Checkbox,  FormControlLabel, FormGroup,  Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Prices } from '../component/prices'
import ProductCard from '../component/ProductCard'

function Home() {
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState()
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const gettotalCount = async () => {
    const totalcount = await axios.get("/api/product/product-count").then(res => {
      if (res.data) {
        setTotal(res.data.data)
      }
    })
  }

  const handlefilter = (value, id) => {

    let all = [...checked]

    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)

    }
    setChecked(all)
  }

  const getcategoryList = async () => {
    await axios.get('/api/category/category_list').then(res => {

      if (res.status == 200) {
        setCategories(res.data.categoryList)

      }
    }).catch(err => toast.warning(err.message))
  }
  const getProducts = async () => {
    await axios.get(`/api/product/productPerPage/${page}`).then(res => {
      setProduct(res?.data?.data)
    })
  }
  useEffect(() => {

    getcategoryList()
    gettotalCount()
  }, [])



  useEffect(() => {
    if (!checked.length && !radio.length)
      getProducts()

  }, [checked.length, radio.length])

  const handleradio = (e) => {
    const radiocheck = e.target.value
    const array = radiocheck.split(",")

    setRadio(array)

  }

  useEffect(() => {
    if (checked.length || radio.length)
      filterProduct()
  }, [checked, radio])

  const filterProduct = async () => {

    await axios.post(`/api/product/filter-product`, { checked, radio }).then(res => {
      if (res.data.status == true)
        setProduct(res.data?.data)
    })
  }

  useEffect(() => {
    loadmore()
  }, [page])

  const loadmore = async () => {
    const data = await axios.get(`/api/product/productPerPage/${page}`).then(res => {
      setProduct([...product, ...res?.data?.data])
    })
  }
  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} md={2}  >
          <Paper>

            <Box sx={{ height: "100%", maxWidth: "100%" }}>

              <Typography sx={{ textAlign: "center", mt: "10px", color: "white", background: "black" }} component="p">Filter By Category</Typography>
              <Box>
                <FormGroup >
                  {
                    categories && categories.map(item => {
                      return (
                        <>
                          <FormControlLabel key={item._id} onChange={(e) => handlefilter(e.target.checked, item._id)} style={{ marginLeft: "10px" }} control={<Checkbox size='small' />} label={item.name} />

                        </>
                      )
                    })
                  }
                </FormGroup>

              </Box>
              <Typography sx={{ textAlign: "center", mt: "10px", color: "white", background: "black" }} component="p">Filter By Price</Typography>
              <Box>

                <RadioGroup onChange={handleradio} >
                  {
                    Prices?.map((item) => (
                      <>
                        <div key={item._id}>
                          <FormControlLabel style={{ marginLeft: "10px" }} value={item.array} control={<Radio size='small' />} label={item.name} />
                        </div>
                      </>
                    ))
                  }
                </RadioGroup>
              </Box>
              <Button style={{ marginLeft: "20px" }} onClick={() => window.location.reload()} variant='outlined' size='small' >Clear filter</Button>

            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <Typography variant='h5' component="p" sx={{ textAlign: "center", mt: "10px", backgroundColor: "gray", mr: "5px" }}>All Product</Typography>
          <Grid container spacing={4.5}>
            {
              product && product.map((item) => {
                return (
                  <>
                    <Grid item md={3} sm={4} xs={12} >
                      <Paper elevation={0} >
                       
                        <ProductCard height="200px" width="200px" data={item} />
                        {/* </Nav Link> */}
                      </Paper>
                    </Grid>

                  </>
                )
              })
            }

          </Grid>
          <Box>
            {
              product ? (

                product.length != 0 && product.length < total && (
                  
                  <Grid container md={12} justifyContent="center">
                  <Grid item md={4}>
                  
                  <Button sx={{marginLeft:"30px"}} variant='standard' onClick={(e)=>{
                    e.preventDefault()
                    setPage(page+1)
                  }}>Load more..</Button>
                  </Grid>
                    </Grid>
                )
              ) : ""
            }
          </Box>
          <Box>

          </Box>
        </Grid>

      </Grid>
    </>
  )
}

export default Home