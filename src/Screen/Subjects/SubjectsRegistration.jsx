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
export default function SubjectsRegistration () {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const navigate = useNavigate();
    const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);
    const location = useLocation();
  
    const [subjectName, setSubjectName] = useState('');
    const [className, setClassName] = useState('');
    const [group, setGroup] = useState('');
  
    const [formdata, setFormData] = useState({
      subjectName: '',
      className: '',
      group: ''
    })
  
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
    // 
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Combine all form data into the formData object
      const formData = {
        subjectName,
        className,
        group
      };
    
      try {
        // Directly add the new subject data to Firestore
        const docRef = await addDoc(collection(db, 'subjects'), formData);
        console.log('Document written with ID: ', docRef.id);
        alert('Subject added successfully!');
        // Clear the form fields after submission
        setSubjectName('');
        setClassName('');
        setGroup('');
       
      } catch (error) {
        console.error('Error adding subject: ', error);
        alert('Error adding subject.');
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
            {/* Left Logo and Heading */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SchoolIcon />
              {!isMobile && (
                <Typography variant="h6" noWrap component="div">
                  Learning Management System
                </Typography>
              )}
            </Box>
  
            {/* Conditionally render the heading in the center on mobile view */}
            {isMobile && (
              <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', flexGrow: 1 }}>
                Learning Management System
              </Typography>
            )}
  
            {/* Right Logo */}
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
          {/* Use empty Box to maintain spacing */}
          <Box sx={{ height: '64px' }} />
          <Typography sx={{ marginBottom: 2 }}>
  
            <form onSubmit={handleSubmit}>
              <h1>Subjects Add</h1>
              <label htmlFor="subjectname">Subject Name:</label>
              <input
                type="text"
                placeholder="Enter Your Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <label htmlFor="class">Select your Class</label>
              <input
                type="number"
                placeholder="Enter Your Class"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
              <FormControl sx={{ marginLeft: '15px' }}>
                <FormLabel id="demo-radio-buttons-group-label" sx={{ marginLeft: '-1px' }}>
                  Select Group
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="generalScience" control={<Radio />} label="General Science" />
                  <FormControlLabel value="preEngineering" control={<Radio />} label="Pre-Engineering" />
                  <FormControlLabel value="computerScience" control={<Radio />} label="Computer Science" />
                </RadioGroup>
              </FormControl>
              <button class="Button" type="submit">Add</button>
            </form>
  
          </Typography>
  
        </Box>
      </Box>
    );
  

}

