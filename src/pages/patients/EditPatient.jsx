import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';

export default function EditPatient({ fid, closeEvent }) {
  const baseURL = "http://localhost:8080/patients";
  const [firstName, setFirstName] = useState("");  // Changed from name to firstName
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [age, setAge] = useState(""); 
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (fid) {
      setFirstName(fid.firstName || "");  // Changed from name to firstName
      setPhone(fid.phone || ""); 
      setAddress(fid.address || ""); 
      setGender(fid.gender || "");
      setAge(fid.age || "");
    }
  }, [fid]);

  const handleFirstNameChange = (event) => setFirstName(event.target.value);  // Changed from handleNameChange to handleFirstNameChange
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);

  const updatePatient = () => {
    const patient = {
      firstName: firstName,  // Changed from name to firstName
      phone: phone,
      address: address,
      gender: gender,
      age: age,
    };

    axios.put(`http://localhost:8080/patients/${fid.id}`, patient)
      .then(() => {
        closeEvent();
        getPatients();
        Swal.fire("Updated!", "Patient details have been updated.", "success");
      }).catch((error) => {
        console.error("Error updating patient:", error);
        Swal.fire("Error", "There was an issue updating the patient.", "error");
      });
  };

  const getPatients = async () => {
    axios.get(baseURL).then((response) => {
      if (Array.isArray(response.data)) {
        setRows(response.data);
      }
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  };

  return (
    <>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Patient
      </Typography>
      <IconButton 
        style={{ position: "absolute", right: "0", top: "0" }} 
        onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            value={firstName}  // Changed from name to firstName
            onChange={handleFirstNameChange}  // Changed from handleNameChange to handleFirstNameChange
            label="First Name"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="number"
            value={phone}
            onChange={handlePhoneChange}
            label="Phone"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            value={address}
            onChange={handleAddressChange}
            label="Address"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            value={gender}
            onChange={handleGenderChange}
            label="Gender"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            type="number"
            value={age}
            onChange={handleAgeChange}
            label="Age"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={updatePatient}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
