import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import userreducer from '../features/user/userSlice'
import thunk from 'redux-thunk'
import categorySlice from '../features/categorySlice'
import productSlice from '../features/productSlice'
const store=configureStore({
    reducer:{
        user:userreducer,
        category:categorySlice,
        product:productSlice,
        middleware:[thunk]
    }
})
export default store