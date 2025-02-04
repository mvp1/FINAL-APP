import React from 'react'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function Home() {
  return (
    <>
    <div className='bgcolor'>
    <Navbar/>
    <Box height={30}/>
        <Box sx={{ display: "flex"}}>
             <Sidenav/>
             
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>home</h1>               
           
        </Box>
       
     </Box>
     </div>
    </>
    )
}

export default Home