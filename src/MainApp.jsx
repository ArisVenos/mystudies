import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar.jsx';
import Mainpage from './components/Mainpage.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';

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
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register db={db}/>} />
                    </Routes>
                </BrowserRouter>
            </GridItem>
            <GridItem area='footer'> <Footer /></GridItem>
        </Grid>    
    );
}

export default MainApp;