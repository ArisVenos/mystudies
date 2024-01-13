import React, { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage';
import Footer from './components/Footer';

function App() {
    return (
        <Grid templateAreas={'"nav" "main" "footer"'}>
            <GridItem area='nav' bg='white'><NavBar /></GridItem>
            <GridItem area='main' bg='white'><MainPage /></GridItem>
            <GridItem area='footer'> <Footer /></GridItem>
        </Grid>
    );
}

export default App;