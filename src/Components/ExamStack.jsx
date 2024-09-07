import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';


const generateRandomData = () => {
  const subjects = ['Mathematics', 'Science', 'History', 'Geography', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  
  return Array.from({ length: 20 }, (_, index) => ({
    id: index,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    date: `15-${(index % 12) + 1}-2024`,
    startTime: `${Math.floor(Math.random() * 12) + 1}:00 AM`,
    endTime: `${Math.floor(Math.random() * 12) + 1}:00 PM`,
    className: classes[Math.floor(Math.random() * classes.length)],
  }));
};

const data = generateRandomData();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ExamStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <h3>Exam Schedule</h3>
      </div>
      <Stack spacing={2}>
        {data.map((item) => (
          <Item key={item.id}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              margin: '10px auto'
            }}>
              <h4 style={{
                marginBottom: '10px',
                color: '#333'
              }}>{item.className} - {item.subject}</h4>
              <span style={{
                marginBottom: '5px',
                color: '#666'
              }}>Date: {item.date}</span>
              <span style={{
                marginBottom: '10px',
                color: '#666'
              }}>Start Time: {item.startTime} | End Time: {item.endTime}</span>
              <Button variant="contained" color="success" style={{
                alignSelf: 'flex-start'
              }}>View Details</Button>
            </div>
          </Item>
        ))}
      </Stack>
    </Box>
  );
}
