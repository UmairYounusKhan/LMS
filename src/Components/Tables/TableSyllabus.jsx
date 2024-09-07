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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const paginationModel = { page: 0, pageSize: 5 };

export default function TableSyllabus() {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsCollection = collection(db, 'syllabus');
        const subjectsSnapshot = await getDocs(subjectsCollection);
        const subjectsList = subjectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRows(subjectsList);
      } catch (error) {
        console.error('Error fetching syllabus: ', error);
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
      await deleteDoc(doc(db, 'syllabus', confirmDeleteId));
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
      const subjectRef = doc(db, 'syllabus', editData.id);
      await updateDoc(subjectRef, {
        subjectName: editData.subjectName,
        className: editData.className,
        group: editData.group
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
    { field: 'subjectName', headerName: 'Subject Name', width: 180 },
    { field: 'className', headerName: 'Class', width: 180 },
    { field: 'group', headerName: 'Group', width: 200 },
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
        <DialogTitle>Edit Subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            value={editData?.subjectName || ''}
            onChange={(e) => setEditData({ ...editData, subjectName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Class"
            type="text"
            fullWidth
            value={editData?.className || ''}
            onChange={(e) => setEditData({ ...editData, className: e.target.value })}
          />
          {/* Group Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel id="group-label">Group</InputLabel>
            <Select
              labelId="group-label"
              value={editData?.group || ''}
              onChange={(e) => setEditData({ ...editData, group: e.target.value })}
              label="Group"
            >
              <MenuItem value="A">General Science</MenuItem>
              <MenuItem value="B">Pre-Engineering</MenuItem>
              <MenuItem value="C">Computer Science</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAlert} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning">Are you sure you want to delete this subject?</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">No</Button>
          <Button onClick={confirmDelete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
