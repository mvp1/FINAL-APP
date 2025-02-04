import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';


export default function AaddDoctor({closeEvent}) {
  const baseURL = "http://localhost:8080/doctors";
  const [name, setName] =useState("");
  const [phone1, setPhone1] =useState(0); 
  const [phone2, setPhone2] =useState(0); 
  const [address, setAddress] =useState(""); 
  const [specialty, setSpecialty] =useState("")
  const [qualification, setQualification] =useState("")
  const setRows =useAppStore((state)=>state.setRows);
  const handleNameChange =(event)=>{
    setName(event.target.value);
  }
  const handlePhone1Change =(event)=>{
    setPhone1(event.target.value);
  }
  const handlePhone2Change =(event)=>{
    setPhone2(event.target.value);
  }
  const handleAddressChange =(event)=>{
    setAddress(event.target.value);
  }
  const handleSpecialtyChange =(event)=>{
    setSpecialty(event.target.value);
  }
  const handleQualificationChange =(event)=>{
    setQualification(event.target.value);
  }
const createDoctor =(event)=>{
   
 var doctor={
    "name": name,
    phone1:phone1,
    phone2: phone2,
    "address": address,
    "specialty": specialty,
    "qualification": qualification
  };

  axios.post('http://localhost:8080/doctors',doctor)
    .then(() => {
      closeEvent()
      getDoctors();
    })
    Swal.fire("Created!", "New Doctor has been added.", "success");
   // getDoctors();
  

}

const getDoctors = async () => {
  axios.get(baseURL).then((response) => {
      if (Array.isArray(response.data)) {
        setRows(response.data);
      } else {
        //console.error('Expected an array but got:', response.data);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
};
  return (
  <>
     <Box sx={{m:2}}></Box>
     <Typography variant="h5" align="center">
      Add Doctor
     </Typography>
     <IconButton 
     style={{ position: "absolute", right:"0", top: "0" }} 
     onClick={closeEvent} >
     <CloseIcon/>
     </IconButton>
     <Grid container spacing = {2}>
        <Grid item xs={12}>
         <TextField id="outlined-basic"  value={name} onChange={handleNameChange} label="Name" variant="outlined" size='small' sx={{minWidth: "100%"}} />
      </Grid>
      <Grid item xs={6}>
         <TextField id="outlined-basic" type="number" value={phone1} onChange={handlePhone1Change}  label="Phone1" variant="outlined" size='small' sx={{minWidth: "100%"}} />
      </Grid>
      <Grid item xs={6}>
      <TextField id="outlined-basic" type="number" value={phone2} onChange={handlePhone2Change} label="Phone2" variant="outlined" size='small' sx={{minWidth: "100%"}} />
   </Grid>
      <Grid item xs={6}>
         <TextField id="outlined-basic" value={qualification} onChange={handleQualificationChange} label="Qualification" variant="outlined" size='small' sx={{minWidth: "100%"}} />
      </Grid>
      <Grid item xs={6}>
         <TextField id="outlined-basic" value={specialty} onChange={handleSpecialtyChange} label="Specialist" variant="outlined" size='small' sx={{minWidth: "100%"}} />
      </Grid>
      <Grid item xs={12}>
         <TextField id="outlined-basic" value={address} onChange={handleAddressChange} label="Address" variant="outlined" size='small' sx={{minWidth: "100%"}} />
      </Grid>
      <Grid item xs={12}>
      <Button variant="contained" onClick={createDoctor}>Submit</Button>
      </Grid>
      </Grid>
  </>
  )
}
