import './App.css';

import NavbarLayout from './component/NavbarLayout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { ThemeProvider } from '@emotion/react';
import Theme from './style/Theme';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import Category from '@mui/icons-material/Category';
import LoginForm from './component/model/LoginForm';
import AdminRoute from './pages/admin/AdminRoute';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/UserDashboard';
import AddCategory from './pages/admin/AddCategory';
import AddProduct from './pages/admin/AddProduct';
import Users from './pages/admin/Users';
import UserProfile from './pages/user/UserProfile';
import Orders from './pages/user/Orders';
import Product from './pages/admin/Product';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchComponent from './component/SearchComponent';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import OrderList from './pages/admin/OrderList';

function App() {
  const token = useSelector(state => state.user.userData)
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>

        <ToastContainer position='top-center' autoClose={1000} />
        <BrowserRouter>
          <Routes>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/category" element={<Category />} />
              <Route path="/cart"  element= { <Cart/> } />
              <Route path="/product-details/:slug" element={<ProductDetails />} />
              <Route path="/search-filter-product" element={<SearchComponent />} />
              <Route path="/dashboard" element={<ProtectedRoute/>}>
                    <Route path="user" element={<UserDashboard/>} />
                    <Route path="user/profile" element={<UserProfile/>} />
                    <Route path="user/order" element={<Orders/>} />
                    {/* <Route path="/paymentSuccess" element={<Home/>} /> */}
              </Route>
              <Route path="/dashboard" element={<AdminRoute/>}>
                    <Route path="admin" element={<Dashboard/>} />
                    <Route path="admin/addCategory" element={<AddCategory/>} />
                    <Route path="admin/addProduct" element={<AddProduct/>} />
                    <Route path="admin/product" element={<Product/>} />
                    <Route path="admin/product/singleProduct/:slug" element={<UpdateProduct/>} />
                    <Route path="admin/orders" element={<OrderList/>} />
              </Route>
             <Route path="/about" element={<ProtectedRoute/>} >
                  <Route path="" element={<About/>} />
             </Route>
              <Route path="/category" element={

                <ProtectedRoute auth={token}>
                  <Category />
                </ProtectedRoute>
              } />
            </Route>


          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
