import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from "sweetalert2";
import { useAppStore } from '../../appStore';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function AddAppointment({ closeEvent }) {
  const baseURL = "http://localhost:8080/appointments";
  const [date, setDate] = useState(""); // The 'date' will now include date and time
  const [description, setDescription] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const setRows = useAppStore((state) => state.setRows);

  // Fetch doctors and patients on component load
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  // Fetching doctor data
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetching patient data
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/patients");
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Handling form submission
  const createAppointment = () => {
    console.log(date)
    const appointment = {
      date: date,
      description: description,
      doctorId: doctorId,
      patientId: patientId,
    };

    axios.post(baseURL, appointment)
      .then(() => {
        closeEvent();
        getAppointments();
        Swal.fire("Created!", "New appointment has been added.", "success");
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        Swal.fire("Error", "There was an issue adding the appointment.", "error");
      });
  };

  // Fetching appointments to update the list
  const getAppointments = async () => {
    try {
      const response = await axios.get(baseURL);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Add Appointment
      </Typography>
      <IconButton
        style={{ position: "absolute", right: "0", top: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        {/* Patient Dropdown */}
        <Grid item xs={6}>
          <Select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            label="Patient"
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="">
              <em>Select a Patient</em>
            </MenuItem>
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.firstName}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Doctor Dropdown */}
        <Grid item xs={6}>
          <Select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            label="Doctor"
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="">
              <em>Select a Doctor</em>
            </MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Date and Time Picker */}
        <Grid item xs={6}>
          <TextField
            type="datetime-local" // This will allow both date and time selection
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date & Time"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Description Text Field */}
        <Grid item xs={12}>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" onClick={createAppointment}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
