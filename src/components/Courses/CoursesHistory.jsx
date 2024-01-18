// AppliedCoursesList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { Button, Spacer, Box, Text, VStack, Center } from '@chakra-ui/react';

const AppliedCoursesList = ({ db }) => {
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the user email from local storage
    const userEmail = localStorage.getItem('email');

    const fetchAppliedCourses = async () => {
      try {
        // Fetch user courses from Firestore
        const userCoursesCollection = collection(db, 'users');
        const userCourseRef = doc(userCoursesCollection, userEmail);
        const userCourseDoc = await getDoc(userCourseRef);

        if (userCourseDoc.exists()) {
          const userData = userCourseDoc.data();
          // Assuming courses is an array of strings
          const courses = userData.courses || [];
          setAppliedCourses(courses.map(title => ({ title, status: 'ΕΓΓΕΓΡΑΜΜΕΝΟΣ' })));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied courses:', error.message);
        setLoading(false);
      }
    };

    fetchAppliedCourses();
  }, [db]);

  return (
    <Center>
      <VStack marginRight="200px" align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="800px" mt={100}>
        <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white">
          ΔΗΛΩΣΕΙΣ
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : appliedCourses.length === 0 ? (
          <Text>ΔΕΝ ΕΧΕΤΕ ΚΑΜΙΑ ΔΗΛΩΣΗ.</Text>
        ) : (
          <VStack align="start" spacing={2} w="100%">
            {appliedCourses.map((course, index) => (
              <Box key={index} borderWidth="2px" borderRadius="md" p={2} w="150%" display="flex" justifyContent="space-between">
              <Text fontSize="large" fontWeight="bold">{course.title}</Text>
              <Text fontSize="large" fontWeight="bold">{course.status}</Text>
            </Box>
            ))}
          </VStack>
        )}
      </VStack>
      <Box bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" position="absolute" top={210} left={20}>
        <Button bg="#26abcc" color="white" onClick={() => window.location.href = "/courses"}>
          ΝΕΑ ΔΗΛΩΣΗ
        </Button>
      </Box>  
    </Center>
  );
};

export default AppliedCoursesList;
