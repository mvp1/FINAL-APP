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
import AddPatient from './AddPatient';
import { useAppStore } from '../../appStore';
import EditPatient from './EditPatient';

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

export default function ListPatient() {
  const baseURL = "http://localhost:8080/patients";
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
    getPatients();
  }, []);

  const getPatients = async () => {
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

  const deletePatient = (id) => {
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
      await axios.delete(`http://localhost:8080/patients/${id}`);
      getPatients();
      Swal.fire("Deleted!", "The patient record has been deleted.", "success");
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const filterData = (e, v) => {
    if (v) {
      setRows([v]);
    } else {
      getPatients(); // Reloads the data if no value is selected
    }
  };

  const editPatient = (id, firstName, address, phone, gender, age) => {
    const patient = {
      id: id,
      firstName: firstName,
      address: address,
      phone: phone,
      gender: gender,
      age: age,
    };
    setFormid(patient);
    handleEditOpen();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <AddPatient closeEvent={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPatient closeEvent={handleEditClose} fid={formid} />
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ padding: "3px" }}>
          <h2>Patients List</h2>
          <Divider />
        </Typography>
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            sx={{ width: 300 }}
            onChange={(e, v) => filterData(e, v)}
            getOptionLabel={(rows) => rows.firstName || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search Patients" />
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
                <TableCell align="left" style={{ minWidth: "100px" }}>Name</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Phone</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Address</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Gender</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Age</TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) && rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          className="cursor-pointer"
                          onClick={() => editPatient(row.id, row.firstName, row.address, row.phone, row.gender, row.age)}
                          style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
                        />
                        <DeleteIcon
                          style={{ fontSize: "20px", color: "darkred", cursor: "pointer" }}
                          onClick={() => deletePatient(row.id)}
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
