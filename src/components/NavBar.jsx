import { Button, HStack, Image } from "@chakra-ui/react";
import React from "react";
import logo from "..//images/logo.png";
import { Spacer } from "@chakra-ui/react";

const NavBar = () => {
    const handleLoginClick = () => {
        // Change the window location to the desired page
        window.location.href = "/login.html";
    };

    const handleHomeClick = () => {
        // Change the window location to the desired page
        window.location.href = "/index.html";
    }

    return (
        <div>
            <HStack bg="white" p={2} borderBottom="4px solid #26abcc">
                <Image src={logo} height="100px" />
                <Spacer />
                <Button bg="#26abcc" color="white" marginRight="10px" onClick={handleLoginClick} >ΣΥΝΔΕΣΗ</Button> 
            </HStack>
            <HStack bg="#26abcc" p={2} borderBottom="4px solid #4f4f50">
                <Button bg="#26abcc" color="white" marginRight="70px" marginLeft="600px" onClick={handleHomeClick} >ΑΡΧΙΚΗ</Button> 
                <Spacer />
                <Button bg="#26abcc" color="white" marginRight="70px">ΔΗΛΩΣΕΙΣ</Button> 
                <Button bg="#26abcc" color="white" marginRight="70px">ΠΙΣΤΟΠΟΙΗΤΙΚΑ</Button> 
                <Button bg="#26abcc" color="white" marginRight="600px">ΒΟΗΘΕΙΑ</Button> 
            </HStack>
        </div>
    );
}

export default NavBar;