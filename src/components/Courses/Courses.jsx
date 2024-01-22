import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Checkbox, Box, Flex, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, VStack, Center } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const CourseApplication = ({ db, userCourses }) => {
  const handleHistoryClick = () => {
    window.location.href = '/courseshistory';
  };

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
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedCourseInfo, setSelectedCourseInfo] = useState(null);
  const [isCourseInfoModalOpen, setIsCourseInfoModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, 'courses');
        const coursesDoc = await getDoc(doc(coursesCollection, 'all_courses'));

        if (coursesDoc.exists()) {
          const allCoursesData = coursesDoc.data();
          setCourses(allCoursesData.courses);
        } else {
          console.error('Courses document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchCourses();
  }, [db]);

  const handleCheckboxChange = (courseTitle) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (prevSelectedCourses.includes(courseTitle)) {
        return prevSelectedCourses.filter((course) => course !== courseTitle);
      } else {
        return [...prevSelectedCourses, courseTitle];
      }
    });
  };

  const handleCourseInfoButtonClick = (courseInfo) => {
    setSelectedCourseInfo(courseInfo);
    setIsCourseInfoModalOpen(true);
    // Open modal or pop-up here
  };

  const handleCloseCourseInfoModal = () => {
    setSelectedCourseInfo(null);
    setIsCourseInfoModalOpen(false);
  };

  const handleApply = async () => {
    try {
      const userEmail = localStorage.getItem('email');
  
      const userCoursesCollection = collection(db, 'users');
      const userCourseRef = doc(userCoursesCollection, userEmail);
  
      const userCourseDoc = await getDoc(userCourseRef);
  
      if (userCourseDoc.exists()) {
        const userData = userCourseDoc.data();
        const appliedCourses = userData.courses || [];
  
        const alreadyAppliedCourses = selectedCourses.filter((course) =>
          appliedCourses.some((appliedCourse) => appliedCourse.title === course && appliedCourse.declared === 1)
        );
  
        if (alreadyAppliedCourses.length > 0) {
          setMessage(`Έχεις ήδη εγγραφεί για τα εξής μαθήματα: ${alreadyAppliedCourses.join(', ')}`);
          return;
        }
  
        const updatedCourses = appliedCourses.map((course) =>
          selectedCourses.includes(course.title) ? { ...course, declared: 1 } : course
        );
  
        await updateDoc(userCourseRef, {
          courses: updatedCourses,
        });
  
        setMessage('Η αίτησή σας ήταν επιτυχημένη');
      } else {
        setMessage('Χρήστης δεν βρέθηκε. Παρακαλώ συνδεθείτε ξανά.');
      }
    } catch (error) {
      console.error('Error applying for course:', error.message);
      setMessage('Σφάλμα κατά την υποβολή αίτησης. Παρακαλώ προσπαθήστε ξανά.');
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
                  <Text fontSize="2xl" bg="#26abcc" color="white" as="span" flex="1" textAlign="left">
                    {semester.title}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              {courses
                .filter((course) => course.semesterId === semester.id)
                .map((course) => (
                  <Flex key={course.id} align="start" justify="space-between" w="100%">
                    <VStack spacing={2} w="80%" align="start">
                      <Checkbox
                        isChecked={selectedCourses.includes(course.title)}
                        onChange={() => handleCheckboxChange(course.title)}
                      >
                        {course.title}
                      </Checkbox>
                    </VStack>
                    <Button  size="xs" fontSize ='1.5rem' borderRadius ='10' bg="#26abcc" color="white" 
                      onClick={() => handleCourseInfoButtonClick(course)}>
                      i
                    </Button>
                  </Flex>
                ))}
            </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        {message && <Text color={message.includes('Η αίτησή σας ήταν επιτυχημένη') ? 'green.500' : 'red.500'}>{message}</Text>}
        <Button colorScheme="teal" onClick={handleApply} disabled={selectedCourses.length === 0}>
          ΔΗΛΩΣΗ
        </Button>
      </VStack>
      <Box bg="#26abcc" borderBottom="4px solid #4f4f50" position="absolute" top={210} left={20}>
        <Button bg="#26abcc" color="white" onClick={handleHistoryClick}>
          ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ
        </Button>
      </Box>
      <Modal isOpen={isCourseInfoModalOpen} onClose={handleCloseCourseInfoModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background='#26abcc' color='white'>
            Πληροφορίες Μαθήματος
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display course information here using selectedCourseInfo */}
            {selectedCourseInfo && (
              <>
                <Text>Εξάμηνο: {selectedCourseInfo.semesterId}</Text>
                <Text>Τύπος: {selectedCourseInfo.type}</Text>
                <Text>Διδάσκων: {selectedCourseInfo.prof}</Text>
                <Text>Βαθμός βάσης: {selectedCourseInfo.basegrade}</Text>
                <Text>Διδακτικές μονάδες: {selectedCourseInfo.ects}</Text>
                <Text>Υπολογίζεται στο βαθμό πτυχίου: {selectedCourseInfo.calculated}</Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseCourseInfoModal}>
              Κλείσιμο
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CourseApplication;

