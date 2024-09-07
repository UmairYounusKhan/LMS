import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

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

// Array of class names for 10 classes
const classNames = Array.from({ length: 10 }, (_, index) => `Class ${index + 1}`);

export default function ExamRTable() {
  return (
    <Box sx={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Exam Result</h3>
      </div>
      <Stack spacing={2}>
        {classNames.map((className, index) => (
          <div key={index}>
            <label>{className} Result</label>
            <Item>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '20px' }}>
                <span>Students Name</span>
                <span>Roll Number</span>
                <span>Grade</span>
              </div>
            </Item>
          </div>
        ))}
      </Stack>
    </Box>
  );
}
