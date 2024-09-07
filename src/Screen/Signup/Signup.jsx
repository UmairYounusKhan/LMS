import React, { useState } from 'react';
import seminarpic from '../../assets/seminar.png';
import logo from '../../assets/logo.jpg';
import './Signup.css';
import { FaGoogle, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { Box, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth, db } from '../../Config/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSignup = async () => {
    console.log(firstname, lastname, email, password);

   await createUserWithEmailAndPassword(auth , email, password)
      .then(async(res) => {
        console.log("users", res.user.uid);

        let userObj={
          firstname,
          lastname,
          email,

        }
        const uID= res.user.uid;
        const storeData = await setDoc(doc(db,"users",uID),userObj);
        console.log("data store")
        navigate('/students/students-list');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate('/students/students-list');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const handleGithub = () => {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('GitHub sign-in successful:', user);
        navigate('/students/students-list');
      })
      .catch((error) => {
        console.error('GitHub sign-in error:', error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        alert(`GitHub sign-in error: ${errorMessage}`);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: { xs: 'none', sm: 'flex' }, // Hide on mobile screens
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: { xs: 2, sm: 3 },
              marginTop: '50px'
            }}
          >
            <span className='Slogo_body'>
              <img style={{ width: '100%' }} src={logo} alt="" />
            </span>
            <span style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>WELCOME TO LEARNING <br /> MANAGEMENT SYSTEM</h1>
            </span>
            <div className='Sfront_img'></div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', height: '100vh' }}
          >
            <div className="Slogin-container">
              <div className="Slogin-form">
                <h1 style={{ color: 'green' }}>Sign up</h1><br />
                <TextField
                  label="Enter Your First name"
                  onChange={e => setFirstname(e.target.value)}
                  required
                  color="secondary"
                  type="text"
                  sx={{ mb: 3, backgroundColor: 'white' }}
                  fullWidth
                />
                <TextField
                  label="Enter Your last name"
                  onChange={e => setLastname(e.target.value)}
                  required
                  color="secondary"
                  type="text"
                  sx={{ mb: 3, backgroundColor: 'white' }}
                  fullWidth
                />
                <TextField
                  label="Enter Your Email"
                  onChange={e => setEmail(e.target.value)}
                  required
                  color="secondary"
                  type="email"
                  sx={{ mb: 3, backgroundColor: 'white' }}
                  fullWidth
                />
                <div style={{ position: 'relative', width: '100%' }}>
                  <TextField
                    label="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type={showPassword ? 'text' : 'password'}
                    color="secondary"
                    sx={{ mb: 3, backgroundColor: 'white' }}
                    fullWidth
                  />
                  <FaEye
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      marginBottom: '0',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-100%)',
                      cursor: 'pointer',
                      display: showPassword ? 'none' : 'block',
                      width: '30px'
                    }}
                  />
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      marginBottom: '0',
                      top: '50%',
                      transform: 'translateY(-100%)',
                      cursor: 'pointer',
                      display: showPassword ? 'block' : 'none',
                      textAlign: 'center',
                      width: '30px'
                    }}
                  />
                </div>
                <button
                  onClick={handleSignup}
                  style={{
                    backgroundColor: (!email || !password) ? '#ccc' : '#ff9100',
                    color: '#fff',
                    cursor: (!email || !password) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Signup
                </button>
                <label style={{paddingTop:'8px',paddingBottom:'8px'}}>OR</label>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      className='google_btn'
                      style={{ backgroundColor: 'white', color: 'black', width: '100%' }}
                      onClick={handleGoogle}
                    >
                      <span style={{ paddingRight: '10px' }}>Signup with</span>
                      <FcGoogle style={{ fontSize: '20px' }} />
                    </button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      className='google-btn'
                      style={{ backgroundColor: 'black', color: 'white', width: '100%' }}
                      onClick={handleGithub}
                    >
                      <span style={{ paddingRight: '10px' }}>Signup with</span>
                      <FaGithub style={{ fontSize: '20px' }} />
                    </button>
                  </Grid>
                </Grid>
                <br />
                <p style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Already have an Account? Click here to Login</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Signup;
