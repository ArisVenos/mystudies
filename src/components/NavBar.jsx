import { Button, HStack, Image } from "@chakra-ui/react";
import React from "react";
import logo from "..//images/logo.png";
import { Spacer } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <HStack bg="white" p={2} borderBottom="4px solid #26abcc">
            <Image src={logo} height="100px" />
            <Spacer />
            <Button bg="#26abcc" color="white" marginRight="10px">ΣΥΝΔΕΣΗ</Button> 
        </HStack>
    );
}

export default NavBar;