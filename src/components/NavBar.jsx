import React from "react";
import { Button, HStack, Image } from "@chakra-ui/react";
import logo from "../images/logo.png";
import { Spacer } from "@chakra-ui/react";

const NavBar = () => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("role") !== null;

  const handleLoginClick = () => {
    // Change the window location to the desired page
    window.location.href = "/login";
  };

  const handleHomeClick = () => {
    // Change the window location to the desired page
    window.location.href = "/index.html";
  };

  const handleCertificateClick = () => {
    // Change the window location to the desired page
    window.location.href = "/certificateslist.html";
  };

  const handleProfileClick = () => {
    // Change the window location to the profile page or any other desired page for logged-in users
    window.location.href = "/profile.html";
  };

  return (
    <div>
      <HStack bg="white" p={2} borderBottom="4px solid #26abcc" justify="center">
        <Image src={logo} height="100px" />
        <Spacer />
        {/* Conditionally render the login or profile button */}
        {isLoggedIn ? (
          <Button bg="#26abcc" color="white" onClick={handleProfileClick}>
            ΠΡΟΦΙΛ
          </Button>
        ) : (
          <Button bg="#26abcc" color="white" onClick={handleLoginClick}>
            ΣΥΝΔΕΣΗ
          </Button>
        )}
      </HStack>
      <HStack bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" justify="center">
        <Button bg="#26abcc" color="white" onClick={handleHomeClick} marginRight="20px">
          ΑΡΧΙΚΗ
        </Button>
        <Button bg="#26abcc" color="white" marginRight="20px">
          ΔΗΛΩΣΕΙΣ
        </Button>
        <Button bg="#26abcc" color="white" onClick={handleCertificateClick} marginRight="20px">
          ΠΙΣΤΟΠΟΙΗΤΙΚΑ
        </Button>
        <Button bg="#26abcc" color="white">
          ΒΟΗΘΕΙΑ
        </Button>
      </HStack>
    </div>
  );
};

export default NavBar;
