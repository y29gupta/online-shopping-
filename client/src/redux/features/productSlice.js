import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    loading: false,
    error: "",
    totalItem:'',
    totalPrice:"",
    searchedProduct: [],
    shippingCharge:300,
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []
}

export const addProduct = createAsyncThunk('product/add', async (state) => {

    return await axios.post("/api/product/add-product", state).then(res => {

        if (res.data.status == true) {
            toast.success(res.data.msg)
            window.location.href = "/dashboard/admin/product"


        } else {
            toast.warning(res.data.msg)
        }
    }).catch(err => { toast.error("Something went wrong") })

})

export const updateProduct = createAsyncThunk('product/update', async ({ id, formdata }) => {
    // console.log(id,"ud",state)
    // const {id, formdata}=state

    return await axios.put(`/api/product/update/${id}`, formdata).then(res => {
        if (res.data.status == true) {
            toast.success(res.data.msg)
            window.location.href = "/dashboard/admin/product"

        } else {
            toast.warning(res.data.msg)
        }
    }).catch(err => console.log(err.message, "err"))

})


export const productSearch = createAsyncThunk('product/search', async (keyword) => {


    const result = await axios.get(`/api/product/search/${keyword}`).then(res => {
        if (res.data.status == true) {
            return res.data.data


        } else {
            toast.warning(res.data.msg)
        }
    }).catch(err => console.log(err.message, "err"))
    return result

})

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, amount } = action.payload

            let existingItem = state.cart.find(item => item._id === product._id)
            if (existingItem) {
                let updatedItem = state.cart.map(item => {
                    if (item._id === existingItem._id) {
                        let newAmount = item.amount + amount
                        if (newAmount >= item.quantity) {
                            newAmount = item.quantity
                        }
                        return {
                            ...item,
                            amount: newAmount

                        }
                    } else {
                        return item
                    }
                })
                // state.cart=[...state.cart,updatedItem]
                localStorage.setItem('cart', JSON.stringify(updatedItem))

                return {
                    ...state,
                    cart: updatedItem

                }

            } else {

                const cartItems = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    amount: amount,
                    description: product.description,
                    quantity: product.quantity,
                    slug: product.slug,
                    category: product.category
                }
                state.cart = [...state.cart, cartItems]
            }

            localStorage.setItem("cart", JSON.stringify(state.cart))

        },
        increaseItemQty: (state, action) => {
            let id = action.payload
            let updatedQty = state.cart.map(item => {
                if (item._id === id) {
                    let incqty = item.amount + 1
                    if(incqty >=item.quantity){
                        incqty=item.quantity
                    }
                    return {
                        ...item,
                        amount: incqty
                    }
                } else {
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(updatedQty))
            return {
                    ...state,
                    cart:updatedQty
            }


        },
        decreaseItemQty: (state, action) => {
            let id = action.payload
            let updatedQty = state.cart.map(item => {
                if (item._id === id) {
                    let decqty = item.amount - 1
                    if(decqty <=1){
                        decqty=1
                    }
                    return {
                        ...item,
                        amount: decqty
                    }
                } else {
                    return item
                }
            })

            localStorage.setItem('cart', JSON.stringify(updatedQty))
            return {
                    ...state,
                    cart:updatedQty
            }

        },
        cartTotalItem:(state)=>{
            let updatedCartItem=state.cart.reduce((initialValue,item)=>{
                let {amount}=item 
                initialValue=initialValue+amount
                return initialValue
            },0)
            return {
                ...state,
                totalItem:updatedCartItem
            }
        },
        totalItemPrice:(state)=>{
            let updatedPrice=state.cart.reduce((initialvalue,item)=>{
                let {price,amount}=item
                initialvalue=initialvalue+(price*amount)
                return initialvalue
            },0)
            return {
                ...state,
                totalPrice:updatedPrice
            }
        },
        removecart: (state) => {
            state.cart = []
            localStorage.removeItem("cart")
        }

    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(productSearch.pending, (state) => {
            state.loading = true
        })
        builder.addCase(productSearch.fulfilled, (state, action) => {
            state.loading = false
            state.searchedProduct = action?.payload
        })
        builder.addCase(productSearch.rejected, (state, action) => {

            state.loading = false
            state.error = action.payload
        })
    }
})
export default productSlice.reducer
export const { addToCart, removecart, increaseItemQty, decreaseItemQty,cartTotalItem,totalItemPrice } = productSlice.actions





