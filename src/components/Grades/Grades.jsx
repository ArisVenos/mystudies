import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Flex, Heading, Text, Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Grades = ({ db, userEmail }) => {
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const userEmail = localStorage.getItem('email');
        // Check if email is available before fetching data
        if (!userEmail) {
          console.error('User email is undefined or null.');
          return;
        }

        // Fetch user data from Firestore based on the email
        const userDocRef = doc(db, 'users', userEmail);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserCourses(userData.courses || []);
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };

    fetchUserCourses();
  }, [db, userEmail]);

  // Group courses by semesterId
  const groupedCourses = userCourses.reduce((acc, course) => {
    const semesterId = course.semesterId;
    acc[semesterId] = acc[semesterId] || [];
    acc[semesterId].push(course);
    return acc;
  }, {});

  return (
    <Flex direction="column" align="center">
      <Heading mb={4} margin="20px">
        ΒΑΘΜΟΛΟΓΙΕΣ
      </Heading>
      {Object.entries(groupedCourses).map(([semesterId, courses]) => {
        // Check if there are any courses with grades for this semester
        const hasGrades = courses.some((course) => course.grade !== -1);

        // Render the semester only if there are courses with grades
        return hasGrades ? (
          <div key={semesterId} style={{ marginBottom: '20px' }}>
            <Heading as="h2" size="md" mb={2} color="#26abcc">
              {`ΕΞΑΜΗΝΟ ${semesterId}`}
            </Heading>
            <Table variant="striped" bg="#26abcc" width="600px">
              <Tbody>
                <Tr bg="white">
                  <Th>ΜΑΘΗΜΑ</Th>
                  <Th>ΒΑΘΜΟΣ</Th>
                </Tr>
                {courses
                  .filter((course) => course.grade !== -1)
                  .map((course) => (
                    <Tr key={course.id}>
                      <Td>{course.title}</Td>
                      <Td>{course.grade}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </div>
        ) : null;
      })}
    </Flex>
  );
};

export default Grades;
