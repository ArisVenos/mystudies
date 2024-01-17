// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

const Profile = ({ db }) => {
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

  return (
    <Flex direction="column" align="center"  height="100vh">
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
          {/* Add additional user data fields as needed */}
        </div>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </Flex>
  );
};

export default Profile;
