import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'



function Dashboard() {
  return (
    <>
    <Navbar/>
    <Box height={30}/>
        <Box sx={{ display: "flex"}}>
             <Sidenav/>
        
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Dashboard</h1>
            </Box>
        </Box>
    </>
  )
}

export default Dashboard