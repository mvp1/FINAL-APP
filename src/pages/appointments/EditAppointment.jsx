// import { IconButton } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import { Typography } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useAppStore } from '../../appStore';
// import MenuItem from '@mui/material/MenuItem';


// export default function EditAppointment({ fid, closeEvent }) {
//   const baseURL = "http://localhost:8080/appoappointments";
//   const [doctorName, setDoctorName] = useState("");  
//   const [patientName, setPatientName] = useState(""); 
//   const [date, setDate] = useState(""); 
//   const [status, setStatus] = useState(""); 
//   const [description, setDescription] = useState(""); 
//   const [doctorId, setDoctorId] = useState(0); 
//   const [patientId, setPatientId] = useState(0); 
//   const setRows = useAppStore((state) => state.setRows);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState("");  // State for the selected doctor

//   const [doctors, setDoctors] = useState([
//         { value: "", label: "Select a doctor" }])
//   const [patients, setPatients] = useState([
//         { value: "", label: "Select a patient" }])
    

//   useEffect(() => {
//     if (fid) {  
//       //setDoctorName(fid.doctorName || "");  // Changed from name to firstName
//       //setPatientName(fid.patientName || "");
//       console.log("fid======")
//       console.log(fid)
//       setDescription(fid.description || ""); 
//       setDate(fid.date || "");
//       setStatus(fid.status || "");
//       setPatientId(fid.patientId || "");
//       setDoctorId(fid.doctorId || "");
      
//     }
//     getDoctors()
//   }, [fid]);

//   const getDoctors = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/doctors");
//       if (Array.isArray(response.data)) {
//         const doctorsList = response.data.map(doctor => ({
//             value: doctor.id, // assuming doctor object has an 'id' field
//             label: doctor.name // assuming doctor object has a 'name' field
//           }));
//           setDoctors([{ value: "", label: "Select a doctor" }, ...doctorsList]);
//           console.log(doctorsList)
//           const doctorToSelect = doctorsList.find(doctor => doctor.value == doctorId);
//           console.log("***********")
//           console.log(doctorToSelect)
//           if (doctorToSelect) {
//             setSelectedDoctor(doctorToSelect.value); // Pre-select the doctor based on condition
//           }
//       } else {
//         console.error('Expected an array but got:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleFirstNameChange = (event) => setFirstName(event.target.value);  // Changed from handleNameChange to handleFirstNameChange
//   const handlePhoneChange = (event) => setPhone(event.target.value);
//   const handleAddressChange = (event) => setAddress(event.target.value);
//   const handleGenderChange = (event) => setGender(event.target.value);
//   const handleAgeChange = (event) => setAge(event.target.value);

//   const updateAppointment = () => {
//     const appointment = {
//       firstName: firstName,  // Changed from name to firstName
//       phone: phone,
//       address: address,
//       gender: gender,
//       age: age,
//     };

//     axios.put(`http://localhost:8080/appointments/${fid.id}`, appointment)
//       .then(() => {
//         closeEvent();
//         getAppointmets();
//         Swal.fire("Updated!", "Appointment details have been updated.", "success");
//       }).catch((error) => {
//         console.error("Error updating Appointment:", error);
//         Swal.fire("Error", "There was an issue updating the Appointment.", "error");
//       });
//   };

//   const getAppointmets = async () => {
//     axios.get(baseURL).then((response) => {
//       if (Array.isArray(response.data)) {
//         setRows(response.data);
//       }
//     }).catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   };

//   return (
//     <>
//       <Box sx={{ m: 2 }}></Box>
//       <Typography variant="h5" align="center">
//         Edit Appointment
//       </Typography>
//       <IconButton 
//         style={{ position: "absolute", right: "0", top: "0" }} 
//         onClick={closeEvent}>
//         <CloseIcon />
//       </IconButton>
//       <Grid container spacing={2}>
        
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//              select
//             value={selectedDoctor}
//            // onChange={handlePhoneChange}
//             label="Doctor"
//             variant="outlined"
//             size="small"
//             sx={{ minWidth: "100%" }}>
//                 {doctors.map((doctor) => (
//             <MenuItem key={doctor.value} value={doctor.value}>
//               {doctor.label}
//             </MenuItem>
//           ))}
//           </TextField>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//            // value={address}
//             select
//            // onChange={handleAddressChange}
//             label="Patient"
//             variant="outlined"
//             size="small"
//             sx={{ minWidth: "100%" }}>
//                 {doctors.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//             </TextField>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             value={status}
//           //  onChange={handleGenderChange}
//             label="Gender"
//             variant="outlined"
//             size="small"
//             sx={{ minWidth: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             id="outlined-basic"
//             type="number"
//             value={description}
//             //onChange={handleAgeChange}
//             label="Age"
//             variant="outlined"
//             size="small"
//             sx={{ minWidth: "100%" }}
//           />
//         </Grid>
//          <Grid item xs={12}>
//           <TextField
//             id="outlined-basic"
//             //value={description}  // Changed from name to firstName
//             onChange={handleFirstNameChange}  // Changed from handleNameChange to handleFirstNameChange
//             label="Description"
//             variant="outlined"
//             size="small"
//             sx={{ minWidth: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" onClick={updateAppointment}>
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// }
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';
import MenuItem from '@mui/material/MenuItem';

export default function EditAppointment({ fid, closeEvent }) {
  const baseURL = "http://localhost:8080/appointments";
  
  const [description, setDescription] = useState(""); 
  const [date, setDate] = useState(""); 
  const [status, setStatus] = useState(""); 
  const [doctorId, setDoctorId] = useState(0); 
  const [patientId, setPatientId] = useState(0); 
  
  const [doctors, setDoctors] = useState([]);  // List of doctors
  const [patients, setPatients] = useState([]); // List of patients

  const [selectedDoctor, setSelectedDoctor] = useState("");  // Currently selected doctor
  const [selectedPatient, setSelectedPatient] = useState("");  // Currently selected patient

  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    if (fid) {
      console.log("Received fid:", fid);  // Log to check if doctorId is being passed properly
      setDescription(fid.description || ""); 
      setDate(fid.date || "");
      setStatus(fid.status || "");
      setPatientId(fid.patientId || 0);
      setDoctorId(17 || 0); 
      console.log("Received fid:", fid.doctorId); // Set doctorId correctly
    }
    getDoctors();
    getPatients();
  }, [fid]);

  // Fetch doctors from the backend
  const getDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctors');
      if (Array.isArray(response.data)) {
        setDoctors([{ value: "", label: "Select a doctor" }, ...response.data]);
        
        // Log the doctors to see the ids and labels
        console.log("Doctors:", response.data);
        
        // Ensure doctorId is being set correctly
        const selectedDoc = response.data.find((doc) => doc.id === doctorId);
        console.log("Selected doctor:", selectedDoc);
        
        if (selectedDoc) setSelectedDoctor(selectedDoc.id);
      } else {
        console.error('Expected an array of doctors but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch patients from the backend
  const getPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patients');
      if (Array.isArray(response.data)) {
        setPatients([{ value: "", label: "Select a patient" }, ...response.data]);
        
        // Log the patients to see their ids and names
        console.log("Patients:", response.data);
        
        const selectedPat = response.data.find((pat) => pat.id === patientId);
        if (selectedPat) setSelectedPatient(selectedPat.id);
      } else {
        console.error('Expected an array of patients but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Handle the update of appointment data
  const updateAppointment = async () => {
    try {
      const updatedAppointment = {
        doctorId: selectedDoctor,
        patientId: selectedPatient,
        status: status,
        description: description,
        date: date
      };

      await axios.put(`${baseURL}/${fid.id}`, updatedAppointment);
      Swal.fire("Updated!", "Appointment details have been updated.", "success");
      closeEvent();  // Close the modal after successful update
    } catch (error) {
      console.error('Error updating appointment:', error);
      Swal.fire("Error", "There was an issue updating the appointment.", "error");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }}></Box>
      <Typography variant="h5" align="center">
        Edit Appointment
      </Typography>
      <IconButton 
        style={{ position: "absolute", right: "0", top: "0" }} 
        onClick={closeEvent}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={2}>
        {/* Doctor selection */}
        <Grid item xs={6}>
          <TextField
            select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            label="Doctor"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}>
            {doctors.map((doctor) => (
              <MenuItem key={doctor.value} value={doctor.value}>
                {doctor.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Patient selection */}
        <Grid item xs={6}>
          <TextField
            select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            label="Patient"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}>
            {patients.map((patient) => (
              <MenuItem key={patient.value} value={patient.value}>
                {patient.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Status field */}
        <Grid item xs={6}>
          <TextField
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        {/* Description field */}
        <Grid item xs={6}>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        {/* Date field */}
        <Grid item xs={12}>
          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        {/* Submit button */}
        <Grid item xs={12}>
          <Button variant="contained" onClick={updateAppointment}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
