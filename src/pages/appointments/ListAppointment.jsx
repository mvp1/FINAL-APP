// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Typography } from '@mui/material';
// import Divider from '@mui/material/Divider';
// import { useState, useEffect } from 'react';
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Swal from "sweetalert2";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { Stack } from '@mui/material';
// import { useAppStore } from '../../appStore';

// export default function ListAppointment() {
//   const baseURL = "http://localhost:8080/appointments";
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
//   const setRows = useAppStore((state) => state.setRows);
//   const rows = useAppStore((state) => state.rows);
//   const [filteredRows, setFilteredRows] = useState(rows);

//   useEffect(() => {
//     getAppointments();
//   }, []);

//   useEffect(() => {
//     filterAppointments(searchQuery);
//   }, [searchQuery, rows]); // Re-filter whenever search query or rows change

//   const getAppointments = async () => {
//     try {
//       const response = await axios.get(baseURL);
//       if (Array.isArray(response.data)) {
//         console.log(response.data)
//         setRows(response.data);
//       } else {
//         console.error('Expected an array but got:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const deleteAppointment = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteApi(id);
//       }
//     });
//   };

//   const deleteApi = async (id) => {
//     try {
//          console.log(id)
//       await axios.delete(`http://localhost:8080/appointments/${id}`);
//       getAppointments(); // Refresh the list after deletion
//       Swal.fire("Deleted!", "Your appointment has been deleted.", "success");
//     } catch (error) {
//       console.error('Error deleting appointment:', error);
//     }
//   };

//   const filterAppointments = (query) => {
//     if (!query) {
//       setFilteredRows(rows);
//     } else {
//       const lowercasedQuery = query.toLowerCase();
//       const filtered = rows.filter(
//         (appointment) =>
//           appointment.doctor.toLowerCase().includes(lowercasedQuery) ||
//           appointment.patient.toLowerCase().includes(lowercasedQuery)
//       );
//       setFilteredRows(filtered);
//     }
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <Typography gutterBottom variant="h6" component="div" sx={{ padding: "3px" }}>
//         <h2>Appointments List</h2>
//         <Divider />
//       </Typography>

//       <Stack direction="row" spacing={2} className="my-2 mb-2">
//         {/* Autocomplete Search for Appointments */}
//         <Autocomplete
//           disablePortal
//           id="appointment-search"
//           options={rows} // Assuming rows have doctor and patient names
//           getOptionLabel={(appointment) => `${appointment.doctorName} - ${appointment.patientName}`} // Display doctor and patient names
//           sx={{ width: 300 }}
//           onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
//           renderInput={(params) => <TextField {...params} size="small" label="Search Appointments" />}
//         />
//       </Stack>

//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Doctor</TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Patient</TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Date</TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Description</TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Status</TableCell>
//               <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(filteredRows) && filteredRows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <TableRow key={index} hover role="checkbox" tabIndex={-1}>
//                   <TableCell align="left">{row.doctorName}</TableCell>
//                   <TableCell align="left">{row.patientName}</TableCell>
//                   <TableCell align="left">{row.date}</TableCell>
//                   <TableCell align="left">{row.description}</TableCell>
//                   <TableCell align="left">{row.status}</TableCell>
//                   <TableCell align="left">
//                     <Stack spacing={2} direction="row">
//                       <EditIcon
//                         style={{
//                           fontSize: "20px",
//                           color: "blue",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => {/* Open the EditAppointment modal */}}
//                       />
//                       <DeleteIcon
//                         style={{
//                           fontSize: "20px",
//                           color: "darkred",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => deleteAppointment(row.id)}
//                       />
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={filteredRows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import AaddDoctor from './AaddDoctor';
import { useAppStore } from '../../appStore'; // Ensure this is correct
import EditAppointment from './EditAppointment';
import AddAppointment from './AddAppointment';
import { format } from 'date-fns';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ListAppointment() {
  const baseURL = "http://localhost:8080/appointments";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleClose = () => setOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const response = await axios.get(baseURL);
      if (Array.isArray(response.data)) {
        setRows(response.data);  // Setting rows if data is an array
      } else {
        console.error('Expected an array but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/${id}`);  // Fix template literal issue
      getAppointments();  
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const filterData = (e,v) => {
    if (v) {
      
      setRows([v]); // Filters data based on selected value
    } else {
      getAppointments(); // Reloads the data if no value is selected
    }
  };
const editAppointment=(row)=>{
  const appointmet={
    id:row.id,
    "doctorName": row.doctorName,
    "patientName":row.patientName,
    "status":row.status,
    "description": row.description,
    "date": row.data,
    "doctorId": row.doctorId,
    "patientId":row.patientId
  };
  setFormid(appointmet);
  handleEditOpen();
}
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <AddAppointment closeEvent={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={editopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditAppointment closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ padding: "3px" }}>
          <h2> <i>Appointments </i></h2>
          <Divider />
        </Typography>
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(e,v)}
            //getOptionLabel={(rows) => rows.patientName || ""}
            getOptionLabel={(rows) => `${rows.doctorName} - ${rows.patientName}`}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Patient" />
            )}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
            Add
          </Button>
        </Stack>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>Doctor</TableCell>
               <TableCell align="left" style={{ minWidth: "100px" }}>Patient</TableCell>
               <TableCell align="left" style={{ minWidth: "100px" }}>Date</TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>Description</TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>Status</TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) && rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">{row.doctorName}</TableCell>
                   <TableCell align="left">{row.patientName}</TableCell>
                   <TableCell align="left">{row.date}</TableCell>
                   <TableCell align="left">{row.description}</TableCell>
                   <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon className="cursor-pointer" onClick={()=> editAppointment(row)} style={{ fontSize: "20px", color: "blue", cursor: "pointer" }} />
                        <DeleteIcon
                          style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                          onClick={() => deleteUser(row.id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
