import React from "react";
import { Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <div style={{ height: '50px', background: '#26abcc', color: 'white' , display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text as='b' marginLeft="0px" fontSize='20px'> ΕΠΙΚΟΙΝΩΝΙΑ: </Text>
            <Text as='b' marginLeft="40px" fontSize='20px'> SECRET@DI.UOA.GR </Text>
            <Text as='b' marginLeft="30px" fontSize='20px'> +30 210 727 5192 </Text>
            <Text as='b' marginLeft="30px" fontSize='20px'> +30 210 727 5173 </Text>
        </div>
    );
}

export default Footer;