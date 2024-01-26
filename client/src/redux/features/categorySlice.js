import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
export const categoryList = createAsyncThunk('category/list', async (state) => {
    try {
         await axios.get("/api/category/category_list", state).then(res => {
            return res.data
        }).catch(err => toast.warning("got some error"))

    }
    catch (err) {
        return toast.error("not runing")
    }
})


const initialState = {
    loading: false,
    data: {},
    error: ""
}
const categorySlice = createSlice({
    name: "categorySlice",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(categoryList.pending, (state) => {
            state.loading = true
        })
        builder.addCase(categoryList.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload

        })
        builder.addCase(categoryList.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

    }

})
export default categorySlice.reducer