import React from "react";
import { Button, HStack, Image } from "@chakra-ui/react";
import logo from "../images/logo.png";
import { Spacer } from "@chakra-ui/react";

const NavBar = () => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("role") !== null;

  // Check if the user is a professor
  const isProfessor = localStorage.getItem("role") === "professor";

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
    window.location.href = "/certificateslist";
  };

  const handleProfileClick = () => {
    // Change the window location to the profile page or any other desired page for logged-in users
    window.location.href = "/profile";
  };

  const handleCoursesClick = () => {
    // Change the window location to the desired page
    window.location.href = "/courses";
  };

  const handleGradesClick = () => {
    // Change the window location to the desired page
    window.location.href = "/grades";
  };

  const handleHelpClick = () => {
    // Change the window location to the desired page
    window.location.href = "/help";
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
      {/* Conditionally render the second row of buttons based on user role */}
      {isProfessor ? null : (
        <HStack bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" justify="center">
          <Button bg="#26abcc" color="white" onClick={handleHomeClick} marginRight="20px">
            ΑΡΧΙΚΗ
          </Button>
          <Button bg="#26abcc" color="white" onClick={handleCoursesClick} marginRight="20px">
            ΔΗΛΩΣΕΙΣ
          </Button>
          <Button bg="#26abcc" color="white" onClick={handleGradesClick} marginRight="20px">
            ΒΑΘΜΟΛΟΓΙΕΣ
          </Button>
          <Button bg="#26abcc" color="white" onClick={handleCertificateClick} marginRight="20px">
            ΠΙΣΤΟΠΟΙΗΤΙΚΑ
          </Button>
          <Button bg="#26abcc" color="white" onClick={handleHelpClick}>
            ΒΟΗΘΕΙΑ
          </Button>
        </HStack>
      )}
    </div>
  );
};

export default NavBar;
