import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { toast } from "react-toastify"

export const userRegister=createAsyncThunk('user/register', async(state)=>{
   try{

   return   await axios.post("/api/auth/register",state)
      .then(res=>{
        if(res.data.status){
          return toast.success(res.data.msg)   
            
        }else{
            toast.warning(res.data.msg)    

        }
     }).catch((err)=>{
            toast.warning(err.response.data.msg) 
               
    })
    }
    catch(err){
       return toast.error(err.message)
    }       
})

export const userLogin=createAsyncThunk('user/login', async(state)=>{
    try{
  return  await axios.post("/api/auth/login",state.values).then(res=>{
      
        if(res.data.status===true){
          
            localStorage.setItem('userInfo',JSON.stringify(res.data.user))
            toast.success(res.data.msg)
            window.location.href=state.path
            return res.data
        }else{

           return toast.warning(res.data.msg);
        }
    }).catch(err=>toast.warning("warning"))
      
      
     }
     catch(err){    
        return toast.error(err.message)
     }       
 })

 
export const userUpdate=createAsyncThunk('user/update', async(state)=>{
    try{
    return   await axios.put("/api/auth/updateProfile",state.values,{
        headers:{
            Authorization:state.token
        }
    })
       .then(res=>{
         if(res.data.status){
            toast.success(res.data.msg)   
          window.location.href="/"
             
         }else{
             toast.warning(res.data.msg)    
 
         }
      }).catch((err)=>{
            //  toast.warning(err.response.data.msg) 
            console.log(err,"errr")
                
     })
     }
     catch(err){
        return toast.error(err.message)
     }       
 })

 export const userLgout=createAsyncThunk('user/logout', async()=>{
    try{
     await axios.get("/api/auth/logout").then(res=>{
        if(res.data.status===true)
        {
           window.location.href="/"
        }
    }).catch(err=>toast.warning("got some error"))
      
     }
     catch(err){
        return toast.error("not runing")
     }       
 })


 
const initialState={
    toggleform:false,
    loading:false,
    error:'',
    status:false,
    isAdmin:false,
    path:'',
    userData:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem("userInfo")):[]
   
}
 const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        toggleModel:(state,action)=>{ 
            state.toggleform=!state.toggleform
            state.path=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userRegister.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(userRegister.fulfilled,(state,action)=>{
                state.loading=false
                state.status=true
                
        })
        builder.addCase(userRegister.rejected,(state,action)=>{
           
            state.loading=false
            state.error=action.payload
        })
        builder.addCase(userLogin.pending,(state)=>{ 
            state.loading=true
           
        })
        builder.addCase(userLogin.fulfilled,(state,action)=>{
                state.loading=false
                state.userData=action.payload.user?action.payload.user:[]
                state.isAdmin=action.payload.user?.userInfo.role==='1'?true:false
          
        })
        builder.addCase(userLogin.rejected,(state,action)=>{
       
            state.loading=false
            state.error=action.payload
        })
        builder.addCase(userUpdate.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(userUpdate.fulfilled,(state,action)=>{
                state.loading=false
                state.status=true
                
        })
        builder.addCase(userUpdate.rejected,(state,action)=>{
           
            state.loading=false
            state.error=action.payload
        })
        builder.addCase(userLgout.pending,(state)=>{
           
            state.loading=true
           
        })
        builder.addCase(userLgout.fulfilled,(state)=>{
                state.loading=false
                
                state.userData=[]
                state.isAdmin=false
          
        })
        builder.addCase(userLgout.rejected,(state,action)=>{
       
            state.loading=false
            state.error=action.payload
        })
      
    }
})

export default userSlice.reducer
export const  {toggleModel}=userSlice.actions
