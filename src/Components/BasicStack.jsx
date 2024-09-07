import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

export default function BasicStack() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/fees/fee-submission');
  };

  const classes = Array.from({ length: 10 }, (_, index) => {
    const classNumber = index + 1;
    const monthlyFee = 500 + 300 * (classNumber - 1);
    const annualFee = 6000 + 300 * (classNumber - 1);
    return { classNumber, monthlyFee, annualFee };
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {classes.map(({ classNumber, monthlyFee, annualFee }) => (
          <Item key={classNumber}>
            <span style={{ fontSize: '22px', fontWeight: '600' }}>Fee Voucher - Class {classNumber}</span>
            <Typography sx={{ display: 'flex', justifyContent: 'space-between', color: 'green', fontSize: '22px', fontWeight: '600' }}>
              <div>Class:</div>
              <div>Class {classNumber}</div>
            </Typography> <br />
            <Typography sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px' }}>
              <div>Monthly Fee:</div>
              <div>{monthlyFee}</div>
            </Typography>
            <br />
            <Typography sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px' }}>
              <div>Annual Fee:</div>
              <div>{annualFee}</div>
            </Typography>
            <br />
            <Button onClick={handleClick} variant="contained" color='success'>Pay Now</Button>
          </Item>
        ))}
      </Stack>
    </Box>
  );
}
