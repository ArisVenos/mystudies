import { Grid, GridItem } from '@chakra-ui/react';
import Footer from './components/Footer';
import Login from './components/Login/Login';

function LoginApp() {
    return (
        <Grid templateAreas={'"login" "footer"'}>
            <GridItem area='login'><Login /></GridItem>
            <GridItem area='footer'> <Footer /></GridItem>
        </Grid>
    );
}

export default LoginApp;