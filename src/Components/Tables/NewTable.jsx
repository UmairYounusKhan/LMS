import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/Firebase'; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';



const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsCollection = collection(db, 'students');
        const studentSnapshot = await getDocs(studentsCollection);
        const studentList = studentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRows(studentList);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
    setOpenAlert(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, 'students', confirmDeleteId));
      setRows(rows.filter(row => row.id !== confirmDeleteId));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
    setOpenAlert(false);
  };

  const cancelDelete = () => {
    setOpenAlert(false);
    setConfirmDeleteId(null);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditData(null);
  };

  const handleSave = async () => {
    try {
      const studentRef = doc(db, 'students', editData.id);
      await updateDoc(studentRef, {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email
      });
      const updatedRows = rows.map(row => row.id === editData.id ? editData : row);
      setRows(updatedRows);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'firstName', headerName: 'First name', width: 180 },
    { field: 'lastName', headerName: 'Last name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row)} variant="contained" color="primary" style={{ marginRight: '10px' }}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} variant="contained" color="secondary">Delete</Button>
        </div>
      ),
    }
  ];

  return (
    <>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={editData?.firstName || ''}
            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={editData?.lastName || ''}
            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={editData?.email || ''}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAlert} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning">Are you sure you want to delete this item?</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">No</Button>
          <Button onClick={confirmDelete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
