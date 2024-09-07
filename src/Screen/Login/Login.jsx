import React, { useState } from 'react'
import seminarpic from '../../assets/seminar.png'
import logo from '../../assets/logo.jpg'
import './Login.css'
import { FaGoogle, FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { Box, Button, Grid, TextField, } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth, db} from '../../Config/Firebase';
import { FcGoogle } from 'react-icons/fc';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email, password);

     await signInWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                console.log(res.user.uid);

                localStorage.setItem("userID",res.user.uid)

                const getData = await getDoc(doc(db, "users", res.user.uid));
                console.log("getData", getData.data())

                localStorage.setItem("userData", JSON.stringify(getData.data()))
               
                // const getDataFromStorage = localStorage.getItem("userData");

                // const data = JSON.parse(getDataFromStorage);
              
                // console.log(data.email);



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
                navigate('/dashboard');
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
                navigate('/dashboard');
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
                            display: { xs: 'none', sm: 'flex' }, 
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: { xs: 2, sm: 3 },
                            marginTop: '50px'
                        }}
                    >
                        <span className='logo_body'>
                            <img style={{ width: '100%' }} src={logo} alt="" />
                        </span>
                        <span style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>WELCOME TO LEARNING <br /> MANAGEMENT SYSTEM</h1>
                        </span>
                        <div className='front_img'></div>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
                        <div className="login-container">
                            <div className="login-form">
                                <h1 style={{color:'green'}}>Login</h1><br />
                                <TextField label="Enter Your Email"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    // variant="outlined"
                                    color="secondary"
                                    type="email"
                                    sx={{ mb: 3, backgroundColor: 'white' }}
                                    fullWidth
                                />
                               

                                <br />
                                <div style={{ position: 'relative', width: '100%'}}>
                                    <TextField
                                        label="Enter Your Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        color="secondary"
                                        sx={{ mb: 3, backgroundColor: 'white'}}
                                        fullWidth
                                        
                                    />

                                    <FaEye
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            marginBottom:'0',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-100%)',
                                            cursor: 'pointer',
                                            display: showPassword ? 'none' : 'block',
                                            width:'30px'
                                        }}
                                    />
                                    <FaEyeSlash
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            marginBottom:'0',
                                            top: '50%',
                                            transform: 'translateY(-100%)',
                                            cursor: 'pointer',
                                            display: showPassword ? 'block' : 'none',
                                            textAlign:'center',
                                            width:'30px'
                                        }}
                                    />
                                </div>
                                <br />
                                <button onClick={handleLogin} 
                                style={{
                                    backgroundColor: (!email || !password) ? '#ccc' : '#ff9100',
                                    color: '#fff',
                                    cursor: (!email || !password) ? 'not-allowed' : 'pointer'
                                }}
                                >Login</button><br />
                                <label htmlFor="">OR</label>
                                <br />
                                

                                <button className='google_btn' style={{ backgroundColor: 'white', color:'black' }} onClick={handleGoogle}><span style={{paddingRight:'20px'}}>Login with</span> <FcGoogle style={{fontSize:'20px'}}/>
                                </button><br />
                                <button style={{ backgroundColor: 'black' }} onClick={handleGithub} className="google-btn"><span style={{paddingRight:'20px'}}>Login with</span> <FaGithub style={{fontSize:'20px'}}/></button><br />
                                <p style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>No Account, Click here to Sign up</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Login;
