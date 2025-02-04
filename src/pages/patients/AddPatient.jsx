import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';

export default function AddPatient({ closeEvent }) {
  const baseURL = "http://localhost:8080/patients";
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState(0); 
  const [address, setAddress] = useState(""); 
  const [gender, setGender] = useState(""); 
  const [age, setAge] = useState(""); 
  const setRows = useAppStore((state) => state.setRows);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const createPatient = () => {
    const patient = {
      firstName: firstName,
      phone: phone,
      address: address,
      gender: gender,
      age: age,
    };

    axios.post(baseURL, patient)
      .then(() => {
        closeEvent();
        getPatients();
        Swal.fire("Created!", "New Patient has been added.", "success");
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
        Swal.fire("Error", "There was an issue adding the patient.", "error");
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
        Add Patient
      </Typography>
      <IconButton
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            value={firstName}
            onChange={handleFirstNameChange}
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
          <Button variant="contained" onClick={createPatient}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
