import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Box, Center, Table, Thead, Tbody, Tr, Th, Td, Input, Button } from '@chakra-ui/react';

const ProfessorModify = ({ db }) => {
  const [courseId, setCourseId] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [userGrades, setUserGrades] = useState({});
  const [modifiedGrades, setModifiedGrades] = useState({});

  useEffect(() => {
    // Fetch professor data when the component mounts
    fetchProfessorData();
  }, []);

  useEffect(() => {
    // Update user grades when the courseDetails or courseId change
    if (courseDetails && courseDetails.declaredUsers && courseDetails.declaredUsers.length > 0) {
      const fetchGradePromises = courseDetails.declaredUsers.map(async (userEmail) => {
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

      Promise.all(fetchGradePromises)
        .then(userGrades => {
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

  const handleGradeChange = (userEmail, newGrade) => {
    setModifiedGrades(prevGrades => ({ ...prevGrades, [userEmail]: newGrade }));
  };

  const handleSubmitGrades = async () => {
    try {
      const userEmail = localStorage.getItem('email');

      // Update the grades in the users' documents
      const updateGradePromises = Object.entries(modifiedGrades).map(async ([userEmail, newGrade]) => {
        const userRef = doc(db, 'users', userEmail);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedCourses = userData.courses.map(course => {
            if (course.id === courseId.id) {
              return { ...course, grade: newGrade === '-' ? -1 : parseInt(newGrade) };
            } else {
              return course;
            }
          });

          // Update the user document with the new grades
          await updateDoc(userRef, { courses: updatedCourses });
          console.log(`Grade updated for ${userEmail}`);
          window.location.href = '/professor';
        } else {
          console.log(`User document for ${userEmail} does not exist`);
        }
      });

      // Wait for all promises to resolve
      await Promise.all(updateGradePromises);

      // Clear the modified grades state after updating
      setModifiedGrades({});
    } catch (error) {
      console.error('Error updating grades:', error.message);
    }
  };

  async function fetchProfessorData() {
    try {
      const userEmail = localStorage.getItem('email');
      const professorRef = doc(db, 'users', userEmail);
      const professorDoc = await getDoc(professorRef);

      if (professorDoc.exists()) {
        const professorData = professorDoc.data();

        if (professorData.courses && professorData.courses.length === 1) {
          const courseId = professorData.courses[0];
          setCourseId(courseId);

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
    <Center marginTop="30px" marginBottom="350px">
      <Box mt="8">
        {courseDetails && (
          <>
            <Box as="h1" fontSize="2xl" fontWeight="bold" mb="4">
              Course ID: {courseId.id} - {courseDetails.title}
            </Box>
            <Table variant="striped" bg="white" width="600px">
              <Thead bg="#26abcc">
                <Tr>
                  <Th color="black" fontWeight="bold">Email</Th>
                  <Th color="black" fontWeight="bold" textAlign="right">ΒΑΘΜΟΣ</Th>
                  <Th textAlign="right" color="black" fontWeight="bold">ΝΕΟΣ ΒΑΘΜΟΣ</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(userGrades).map(([userEmail, userGrade]) => (
                  <Tr key={userEmail}>
                    <Td>{userEmail}</Td>
                    <Td textAlign="right">{userGrade}</Td>
                    <Td textAlign="right">
                      <Input
                        type="text"
                        placeholder="Νέος βαθμός"
                        textAlign="right"
                        onChange={(e) => handleGradeChange(userEmail, e.target.value)}
                        style={{ width: "130px", outline: "1px solid black" }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Center mt="4">
              <Button  onClick={handleSubmitGrades} bg="#26abcc">
                ΥΠΟΒΟΛΗ
              </Button>
            </Center>
          </>
        )}
      </Box>
    </Center>
  );
};

export default ProfessorModify;
