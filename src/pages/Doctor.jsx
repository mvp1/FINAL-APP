import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar'
import ListDoctor from './doctors/listDoctor';


function Doctor() {
  return (
    <>
    <Navbar/>
    <Box height={70}/>
        <Box sx={{ display: "flex"}}>
             <Sidenav/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <ListDoctor/>
            </Box>
        </Box>
    </>
  )
}

export default Doctor