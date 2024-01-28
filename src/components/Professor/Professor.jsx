import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td , Button , Flex} from '@chakra-ui/react';

const Professor = ({ db }) => {
  const [courseId, setCourseId] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [userGrades, setUserGrades] = useState({});

  const handleModifyClick = () => {
    // Change the window location to the desired page
    window.location.href = "/professorModify";
};

  useEffect(() => {
    // Fetch professor data when component mounts
    fetchProfessorData();
  }, []);

  useEffect(() => {
    if (courseDetails && courseDetails.declaredUsers && courseDetails.declaredUsers.length > 0) {
      // Use Promise.all to await all the asynchronous operations
      const fetchGradePromises = courseDetails.declaredUsers.map(async (userEmail) => {
        // Fetch the user document to get the grade
        const userRef = doc(db, 'users', userEmail);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userGrade = userData.courses.find(course => course.id === courseId.id)?.grade;

          return { userEmail, userGrade };
        } else {
          console.log(`User document for ${userEmail} does not exist`);
          return { userEmail, userGrade: null };
        }
      });

      // Wait for all promises to resolve
      Promise.all(fetchGradePromises)
        .then(userGrades => {
          // Set the user grades in the state
          const userGradesObject = userGrades.reduce((acc, { userEmail, userGrade }) => {
            acc[userEmail] = userGrade === -1 ? '-' : userGrade;
            return acc;
          }, {});
          setUserGrades(userGradesObject);
        })
        .catch(error => {
          console.error('Error fetching user grades:', error.message);
        });
    }
  }, [db, courseId, courseDetails]);

  async function fetchProfessorData() {
    try {
      const userEmail = localStorage.getItem('email');
      // Create a reference to the professor's document
      const professorRef = doc(db, 'users', userEmail);

      // Fetch the professor's document
      const professorDoc = await getDoc(professorRef);

      if (professorDoc.exists()) {
        console.log('Professor document data:', professorDoc.data());
        const professorData = professorDoc.data();

        // If the professor has courses array with exactly one ID
        if (professorData.courses && professorData.courses.length === 1) {
          const courseId = professorData.courses[0];
          setCourseId(courseId);

          // Fetch the course details based on courseId.id
          const coursesCollection = doc(db, 'courses', 'all_courses');
          const courseDoc = await getDoc(coursesCollection);

          if (courseDoc.exists()) {
            const allCoursesData = courseDoc.data();
            const matchingCourse = allCoursesData.courses.find(course => course.id === courseId.id);

            if (matchingCourse) {
              setCourseDetails(matchingCourse);
            } else {
              console.log('Course with matching ID not found');
            }
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
      console.error('Error fetching professor data:', error.message);
    }
  }

  return (
    <Flex direction="column" align="center">
    <Center marginTop="30px" marginBottom="50px">
      <Box mt="8">
        {courseDetails && (
          <>
            <Box as="h1" fontSize="2xl" fontWeight="bold" mb="4">
              Course ID: {courseId.id} - {courseDetails.title}
            </Box>
            <Table variant="striped" bg="#26abcc" border="2px">
              <Thead>
                <Tr>
                  <Th><strong>E-mail Φοιτητη</strong></Th>
                  <Th textAlign="right"><strong>Βαθμος</strong></Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(userGrades).map(([userEmail, userGrade]) => (
                  <Tr key={userEmail}>
                    <Td>{userEmail}</Td>
                    <Td textAlign="right">{userGrade}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </Box>
    </Center>
    <Button variant="solid" bg='#26abcc' onClick={handleModifyClick} marginBottom="420px" alignContent="center"> Τροποποίηση Βαθμολογίας </Button>
    </Flex>
  );
};

export default Professor;