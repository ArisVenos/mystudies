import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Spacer } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import bg from "./bg.jpg";

const PMain = ({ db }) => {
  const [professorCourses, setProfessorCourses] = useState([]);

  const handleProfessorClick = () => {
    // Change the window location to the desired page
    window.location.href = `/professor`;
  };

  useEffect(() => {
    // Fetch professor courses when component mounts
    fetchProfessorCourses();
  }, []);

  async function fetchProfessorCourses() {
    try {
      const userEmail = localStorage.getItem('email');
      // Create a reference to the professor's document
      const professorRef = doc(db, 'users', userEmail);

      // Fetch the professor's document
      const professorDoc = await getDoc(professorRef);

      if (professorDoc.exists()) {
        console.log('Professor document data:', professorDoc.data());
        const professorData = professorDoc.data();

        // If the professor has courses array with one or more IDs
        if (professorData.courses && professorData.courses.length > 0) {
          const coursesCollection = doc(db, 'courses', 'all_courses');
          const courseDoc = await getDoc(coursesCollection);

          if (courseDoc.exists()) {
            const allCoursesData = courseDoc.data();
            const professorCoursesData = professorData.courses.map((courseId) => {
              const matchingCourse = allCoursesData.courses.find(course => course.id === courseId.id);
              return matchingCourse ? { id: courseId.id, title: matchingCourse.title } : null;
            }).filter(course => course !== null);

            setProfessorCourses(professorCoursesData);
          } else {
            console.log('Courses document does not exist');
          }
        } else {
          console.log('Professor has either no courses or multiple courses');
        }
      } else {
        console.log('Professor document does not exist');
      }
    } catch (error) {
      console.error('Error fetching professor courses:', error.message);
    }
  }

  return (
    <Flex direction="column" align="center" height="100vh" bgImage={bg} bgSize="cover" bgPosition="center" bgRepeat="no-repeat">
      <Center marginTop="30px" marginBottom="50px">
        <Box mt="8" p={4} borderRadius="md" bg="white" height="750px" border="2px solid black" width='1000px'>
            <h2 align="center" style={{margin: '30px'}}>ΔΙΑΘΕΣΙΜΑ ΜΑΘΗΜΑΤΑ</h2>
          <Box>
            <Table variant="striped" bg="#26abcc" border="2px" width='700px' align="center">
              <Thead>
                <Tr>
                  <Th color="black"><strong>ID ΜΑΘΗΜΑΤΟΣ</strong></Th>
                  <Th textAlign="center" color="black"><strong>ΤΙΤΛΟΣ ΜΑΘΗΑΜΤΟΣ</strong></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {professorCourses.map(({ id, title }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td><strong>{title}</strong></Td>
                    <Td>
                      <Button variant="solid" bg='#26abcc' onClick={() => handleProfessorClick()}>
                        ΒΑΘΜΟΛΟΓΙΟ
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Card marginTop="50px" border="2px solid black" width="700px" height="400px" textAlign="center" marginLeft="130px">
                <CardHeader bg="#26abcc" height="50px" >ΟΔΗΓΙΕΣ</CardHeader>
                <CardBody textAlign="left">
                    <p>• Στην αρχική σελίδα θα βρείτε τα διαθέσιμα μαθήματα για το τρέχον εξάμηνο.</p>
                    <p>• Για την επεξεργασία του βαθμολογίου κάθε μαθήματος πατάτε στο κουμπί βαθμολόγιο δίπλα από το συγκεκριμένο μάθημα.</p>
                    <p>• Στον πίνακα φαίνονται οι τρέχον βαθμοί για κάθε φοιτητή που έχει δηλώσει το μάθημα.</p>
                    <p>• Για να τροποποιήσετε κάθε βαθμό των φοιτητών πατήστε στο κουμπί Τροποποίηση Βαθμολογίας.</p>
                    <p>• Αφού έχετε προσθέσει το νέο βαθμολόγιο για τους φοιτητές, πατάτε υποβολή και αλλάζουν οι αποθηκευμένοι βαθμοί των επηρεασμένων φοιτητών.</p>
                </CardBody>
            </Card>
          </Box>
        </Box>
      </Center>
    </Flex>
  );
};

export default PMain;
