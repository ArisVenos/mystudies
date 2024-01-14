import { Grid, GridItem } from '@chakra-ui/react';
import Footer from './components/Footer';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';

function LoginApp() {
    return (
        <Grid templateAreas={'"navbar" "login" "footer"'}>
            <GridItem area='navbar' bg='white'><NavBar /></GridItem>
            <GridItem area='login'><Login /></GridItem>
            <GridItem area='footer'> <Footer /></GridItem>
        </Grid>
    );
}

export default LoginApp;