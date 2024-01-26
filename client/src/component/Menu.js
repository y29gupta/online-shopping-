
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export const navMenu=[
    {
      to:"/",
      label:"Home",
      // icon:<HomeIcon/>
    },
      {
        to:"/about",
        label:"About",
        // icon:<InfoIcon/>
      },
      {
        to:"/category",
        label:"Category",
        icon:<CategoryIcon/>
      },
      {
        to:"/cart",
        icon:<ShoppingCartOutlinedIcon sx={{color:"white"}}/>
      },
    
    // {
    //   to:"/cart",
    //   label:"Cart",
    //   icon:<ShoppingCartIcon/>
    // }
    ]

    export const adminMenu=[
      {
        label:"Add Category",
        to:"/dashboard/admin/addCategory",
        // icon:
      },
      {
        label:"Products",
        to:"/dashboard/admin/product",
        // icon:
      },
      {
        label:"Add Product",
        to:"/dashboard/admin/addProduct",
        // icon:
      },
      {
        label:"Order list",
        to:"/dashboard/admin/orders",
        // icon:
      },
    ]
    

    export const userMenu=[
      {
        label:"User Profile",
        to:"/dashboard/user/profile",
        // icon:
      },
      {
        label:"orders placed",
        to:"/dashboard/user/order",
        // icon:
      },
      // {
      //   label:"All Users",
      //   to:"/dashboard/admin/userList",
      //   // icon:
      // },
    ]
    