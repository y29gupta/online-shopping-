const { createTheme } = require("@mui/material");
// const { purple, red } = require("@mui/material/colors");

const Theme=createTheme({
    palette:{
        primary:{
            main:"#1a237e",
            light:"#7986cb",
            dark:"#5c6bc0"
        },
        secondary:{
            main:"#9fa8da"
            
        }
    },
    typography:{
       
    //    fontWeight:"400",
       allVariants:{
        // color:"#"
       },
    //    fontFamily: 'Poppins'
    }
})

export default Theme