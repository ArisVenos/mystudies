import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import Mainpage from './components/MainPage.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login/Login.jsx';
import Certificates from './components/Certificates/Certificates.jsx';
import Register from './components/Register/Register.jsx';
import CertificatesList from './components/Certificates/CertificatesList.jsx';
import Profile from './components/Profile/Profile.jsx';
import Courses from './components/Courses/Courses.jsx';
import CoursesHistory from './components/Courses/CoursesHistory.jsx';
import Grades from './components/Grades/Grades.jsx';

import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function MainApp() {
    return (
        <Grid templateAreas={'"nav" "route" "footer"'}>
            <GridItem area='nav' bg='white'><NavBar /></GridItem>
            <GridItem area='route' bg='white'>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Mainpage />} />
                        <Route path="/index.html" element={<Mainpage />} />
                        <Route path="/login" element={<Login db={db} />} />
                        <Route path="/courses" element={<Courses db={db} />} />
                        <Route path="/courseshistory" element={<CoursesHistory db={db} />} />
                        <Route path="/certificateslist" element={<CertificatesList db={db} />} />
                        <Route path="/certificates" element={<Certificates db={db} />} />
                        <Route path="/register" element={<Register db={db} />} />
                        <Route path="/profile" element={<Profile db={db}/>} />
                        <Route path="/grades" element={<Grades db={db}/>} />
                    </Routes>
                </BrowserRouter>
            </GridItem>
            <GridItem area='footer'> <Footer /></GridItem>
        </Grid>    
    );
}

export default MainApp;