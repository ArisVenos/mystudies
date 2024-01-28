import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { Button, Box, Center, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Professor = ({ db, userEmail }) => {
  const [professorData, setProfessorData] = useState(null);
  const [professorCourses, setProfessorCourses] = useState([]);

  useEffect(() => {
    // Fetch professor data when component mounts
    fetchProfessorData();
  }, []);

  async function fetchProfessorData() {
    try {
      // Create a reference to the professor's document
      const professorRef = doc(db, 'users', userEmail);

      // Fetch the professor's document
      const professorDoc = await getDoc(professorRef);

      if (professorDoc.exists()) {
        const professorData = professorDoc.data();
        setProfessorData(professorData);

        // If the professor has courses array, fetch and set them
        if (professorData.courses && professorData.courses.length > 0) {
          const coursesData = await fetchCourses(professorData.courses);
          setProfessorCourses(coursesData);
        }
      } else {
        console.log('Professor document does not exist');
      }
    } catch (error) {
      console.error('Error fetching professor data:', error.message);
    }
  }

  async function fetchCourses(courseIds) {
    try {
      // Create a reference to the 'courses' collection
      const coursesRef = collection(db, 'courses');

      // Fetch documents for the provided course IDs
      const coursesSnapshot = await getDocs(coursesRef);

      // Extract course data from each document
      const coursesData = coursesSnapshot.docs
        .filter(doc => courseIds.includes(doc.id))
        .map(doc => doc.data());

      return coursesData;
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  }

  return (
    <Center>
      <Box mt="8">
        <Button colorScheme="blue" onClick={() => fetchProfessorData()}>
          Refresh Professor Data
        </Button>

        {professorData && (
          <Table variant="striped" colorScheme="teal" mt="4">
            <Thead>
              <Tr>
                <Th>Attribute</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(professorData).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>{Array.isArray(value) ? value.join(', ') : value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {professorCourses.length > 0 && (
          <Table variant="striped" colorScheme="teal" mt="4">
            <Thead>
              <Tr>
                <Th>Course ID</Th>
                <Th>Course Name</Th>
                {/* Add other course attributes as needed */}
              </Tr>
            </Thead>
            <Tbody>
              {professorCourses.map(course => (
                <Tr key={course.id}>
                  <Td>{course.id}</Td>
                  <Td>{course.title}</Td>
                  {/* Add other course attributes as needed */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Center>
  );
};

export default Professor;
