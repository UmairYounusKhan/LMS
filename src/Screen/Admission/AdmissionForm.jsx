import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import { db } from '../../Config/Firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth } from '../../Config/Firebase';

const drawerWidth = 280;

export default function AdmissionForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [gender, setGender] = useState('female');
  
  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleListItemClick = (item) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleSubmenuItemClick = (path, event) => {
    event.preventDefault();
    navigate(path);
  };

  const menuItems = [
    {
      label: 'STUDENTS',
      submenus: [
        { label: 'Students Registration', path: '/students/students-registration' },
        { label: 'Students List', path: '/students/students-list' },
      ],
    },
    {
      label: 'Teachers',
      submenus: [
        { label: 'Teacher Registration', path: '/teachers/teachers-registration' },
        { label: 'Teacher List', path: '/teachers/teachers-list' },
      ],
    },
    {
      label: 'Subject',
      submenus: [
        { label: 'Subjects Add', path: '/subjects/subjects-add' },
        { label: 'Subjects List', path: '/subjects/subjects-list' },
      ],
    },
    {
      label: 'Syllabus',
      submenus: [
        { label: 'Syllabus Form', path: '/syllabus/syllabus-form' },
        { label: 'Syllabus List', path: '/syllabus/syllabus-list' },
      ],
    },
    {
      label: 'School',
      submenus: [
        { label: 'Students Registration', path: '/students/students-registration' },
        { label: 'Teacher Registration', path: '/teachers/teachers-registration' },
      ],
    },
    {
      label: 'Class',
      submenus: [
        { label: 'Class Form', path: '/class/class-form' },
        { label: 'Class List', path: '/class/class-List' },
      ],
    },
    {
      label: 'Fees',
      submenus: [
        { label: 'Fee Structure', path: '/fees/fee-structure' },
        { label: 'Fee Voucher', path: '/fees/fee-voucher' },
        { label: 'Fee Submission', path: '/fees/fee-submission' },
      ],
    },
    {
      label: 'Admission',
      submenus: [
        { label: 'Admission Form', path: '/admission/admission-form' },
      ],
    },
    {
      label: 'Exam',
      submenus: [
        { label: 'Exam Schedule', path: '/exam/exam-schedule' },
        { label: 'Exam Result', path: '/exam/exam-result' },
      ],
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    menuItems.forEach((item) => {
      const isSubmenuActive = item.submenus.some(
        (submenu) => submenu.path === currentPath
      );
      if (isSubmenuActive) {
        setDropdownOpen((prevState) => ({
          ...prevState,
          [item.label]: true,
        }));
      }
    });
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      dob,
      qualification,
      gender
    };

    try {
      const q = query(collection(db, 'admission'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert('Email already exists. Please choose a different email.');
      } else {
        const docRef = await addDoc(collection(db, 'admission'), formData);
        console.log('Document written with ID: ', docRef.id);
        alert('Student registered successfully!');
      }
    } catch (error) {
      console.error('Error registering class: ', error);
      alert('Error registering class.');
    }
  };
  
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : `calc(100%)`,
          ml: isMobile ? 0 : `${drawerWidth}px`, backgroundColor: 'green'
        }}
      >
        <Toolbar sx={{ justifyContent: isMobile ? 'space-between' : 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SchoolIcon />
            {!isMobile && (
              <Typography variant="h6" noWrap component="div">
                Learning Management System
              </Typography>
            )}
          </Box>

          {isMobile && (
            <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Learning Management System
            </Typography>
          )}

<Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/path/to/right-logo.png"
              alt="Right Logo"
              style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
              onClick={() => setLogoutMenuOpen(!logoutMenuOpen)}
            />
            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            {logoutMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '60px', // Adjust the position as needed
                right: '0',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '5px',
              }}>
                <Button onClick={handleLogout} variant='contained' color='error'>
                  Logout
                </Button>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'fixed',
            top: '64px',
            boxShadow: '2px 2px 10px grey'
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isMobile ? open : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Divider />
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleListItemClick(item.label)}>
                  <ListItemIcon>
                    <InboxIcon sx={{ color: 'green' }} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
              {dropdownOpen[item.label] && item.submenus && (
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {item.submenus.map((submenu) => (
                    <ListItem disablePadding key={submenu.label}>
                      <ListItemButton onClick={(event) => handleSubmenuItemClick(submenu.path, event)}>
                        <ListItemText primary={submenu.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Box sx={{ height: '64px' }} />
        <Typography sx={{ marginBottom: 2 }}>
          <form onSubmit={handleSubmit}>
            <h1>Admission Form</h1>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="number"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              placeholder="Enter Your Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <FormControl sx={{ marginLeft: '15px' }}>
              <FormLabel id="demo-radio-buttons-group-label" sx={{ marginLeft: '-1px' }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                name="radio-buttons-group"
              >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                        <button className="Button" type="submit">Submit</button>
                    </form>
                </Typography>
            </Box>
        </Box>
    );
}
