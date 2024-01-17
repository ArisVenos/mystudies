import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Checkbox, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, VStack, Center } from '@chakra-ui/react';

const CourseApplication = ({ db }) => {
  const semestersData = [
    { id: 1, title: '1o ΕΞΑΜΗΝΟ' },
    { id: 2, title: '2o ΕΞΑΜΗΝΟ' },
    { id: 3, title: '3o ΕΞΑΜΗΝΟ' },
    { id: 4, title: '4o ΕΞΑΜΗΝΟ' },
    { id: 5, title: '5o ΕΞΑΜΗΝΟ' },
    { id: 6, title: '6o ΕΞΑΜΗΝΟ' },
    // Add more semesters if needed
  ];

  const [semesters, setSemesters] = useState(semestersData);
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourses, setSelectedCourses] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the available courses from Firestore
    const fetchCourses = async () => {
      // You can fetch courses from Firebase based on the selected semester if needed
      // For now, just set the initial courses
      setCourses({
        1: [
          { id: 1, title: 'ΕΙΣΑΓΩΓΗ ΣΤΟΝ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟ' },
          { id: 2, title: 'ΛΟΓΙΚΗ ΣΧΕΔΙΑΣΗ' },
          { id: 3, title: 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΒΡΑ' },
        ],
        2: [
          { id: 4, title: 'ΔΟΜΕΣ ΔΕΔΟΜΕΝΩΝ' },
          { id: 5, title: 'ΑΡΧΙΤΕΚΤΟΝΙΚΗ' },
          { id: 6, title: 'ΑΝΑΛΥΣΗ 1' },
        ],
        3: [
            { id: 7, title: 'ΑΝΑΛΥΣΗ 2' },
            { id: 8, title: 'ΣΗΜΑΤΑ ΚΑΙ ΣΥΣΤΗΜΑΤΑ ' },
        ],
        4: [
            { id: 9, title: 'ΑΛΓΟΡΙΘΜΟΙ ΚΑΙ ΠΟΛΥΠΛΟΚΟΤΗΤΑ' },
            { id: 10, title: 'ΔΙΚΤΥΑ ΕΠΙΚΟΙΝΩΝΙΩΝ 1' },
        ],
          5: [
            { id: 11, title: 'ΛΕΙΤΟΥΡΓΙΚΑ ΣΥΣΤΗΜΑΤΑ' },
            { id: 12, title: 'ΥΛΟΠΟΙΗΣΗ ΣΥΣΤΗΜΑΤΩΝ ΒΑΣΕΩΝ ΔΕΔΟΜΕΝΩΝ' },
          ],
          6: [
            { id: 13, title: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΣΤΗΜΑΤΟΣ' },
            { id: 14, title: 'ΜΕΤΑΓΓΛΩΤΙΣΤΕΣ' },
        ],
        // Add more courses for each semester if needed
      });
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseTitle) => {
    // Toggle the checkbox state for the selected course
    setSelectedCourses((prevSelectedCourses) => {
      if (prevSelectedCourses.includes(courseTitle)) {
        return prevSelectedCourses.filter((course) => course !== courseTitle);
      } else {
        return [...prevSelectedCourses, courseTitle];
      }
    });
    console.log('Selected courses:', selectedCourses);
  };




  const handleApply = async () => {
    try {
      // Get the user email from local storage
      const userEmail = localStorage.getItem('email');

      // Check if the user has already applied for the selected course
      const userCoursesCollection = collection(db, 'users');
      const userCourseRef = doc(userCoursesCollection, userEmail);

      const userCourseDoc = await getDoc(userCourseRef);

      if (userCourseDoc.exists()) {
        const userData = userCourseDoc.data();
        const appliedCourses = userData.courses || [];

        // Check if the selected courses are already applied
        const alreadyAppliedCourses = selectedCourses.filter((course) =>
          appliedCourses.some((appliedCourse) => appliedCourse.title === course)
        );

        if (alreadyAppliedCourses.length > 0) {
          setMessage(`Εχεις ηδη εγγραφει για τα εξης μαθηματα: ${alreadyAppliedCourses.join(', ')}`);
          return;
        }

        // Add the selected courses to the user's applied courses
        await updateDoc(userCourseRef, {
            courses: arrayUnion(...selectedCourses),
        });

        setMessage('Η αιτηση σας ηταν επιτυχης');
      } else {
        setMessage('User not found. Please log in again.');
      }
    } catch (error) {
      console.error('Error applying for course:', error.message);
      setMessage('Error applying for course. Please try again.');
    }
  };

  return (
    <Center>
      <VStack marginRight="200px" align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="600px" mt={100}>
        <Text fontSize="2xl" fontWeight="bold" bg="#26abcc" color="white" mb={4}>
          ΠΡΟΓΡΑΜΜΑ ΣΠΟΥΔΩΝ 2023-2024
        </Text>
        <Accordion width="130%" allowToggle>
          {semesters.map((semester) => (
            <AccordionItem key={semester.id}>
              <h2>
                <AccordionButton>
                  <Text fontSize="2xl"  bg="#26abcc" color="white" as = "span" flex="1" textAlign="left">
                    {semester.title}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
                <AccordionPanel pb={4}>
                {courses[semester.id] &&
                  courses[semester.id].map((course) => (
                    <VStack key={course.id} align="start" spacing={2} w="100%">
                      <Checkbox
                        isChecked={selectedCourses.includes(course.title)}
                        onChange={() => handleCheckboxChange(course.title)}
                      >
                        {console.log('Is checked:', selectedCourses.includes(course.title))}
                        {course.title}
                      </Checkbox>
                    </VStack>
                  ))}
                </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        {message && <Text color={message.includes('Η αιτηση σας ηταν επιτυχης') ? 'green.500' : 'red.500'}>{message}</Text>}
        <Button colorScheme="teal" onClick={handleApply} disabled={selectedCourses.length === 0}>
          ΔΗΛΩΣΗ
        </Button>
      </VStack>
    </Center>
  );
};

export default CourseApplication;

