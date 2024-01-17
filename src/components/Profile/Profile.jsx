import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth , signOut } from 'firebase/auth'; 
import {
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  TableContainer,
} from '@chakra-ui/react';

const Profile = ({ db}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the email of the logged-in user from local storage
    const userEmail = localStorage.getItem('email');

    // Fetch user data from Firestore based on the email
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', userEmail);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [db]);

  const handleLogout = async () => {
    const auth = getAuth();
    
    try {
      await signOut(auth); // Use the signOut function from firebase/auth
      localStorage.clear(); // Clear local storage
      window.location.href = '/'; // Redirect to the home page or login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Flex direction="column" align="center" height="100vh">
      <Heading mb={4}>ΣΤΟΙΧΕΙΑ ΧΡΗΣΤΗ</Heading>
      {userData ? (
        <div>
          <TableContainer width="300px">
            <Table variant="striped" bg="#26abcc">
              <Tbody>
                <Tr>
                  <Td>Email: {userData.email}</Td>
                </Tr>
                <Tr>
                  <Td>Role: {userData.role}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Button mt={4} colorScheme="red" onClick={handleLogout}>
            Αποσύνδεση
          </Button>
        </div>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </Flex>
  );
};

export default Profile;
