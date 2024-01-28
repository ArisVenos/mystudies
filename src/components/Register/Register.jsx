import React, { useState } from 'react';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { Button, Input, Flex, useDisclosure , Image } from '@chakra-ui/react';
import logo from "./logo.png";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import './Register.css';

const userCourses = [
  { id: 1, title: 'ΕΙΣΑΓΩΓΗ ΣΤΟΝ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Παναγιώτης Σταματόπουλος', declaredUsers: [] },
  { id: 2, title: 'ΛΟΓΙΚΗ ΣΧΕΔΙΑΣΗ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Πασχάλης', declaredUsers: []},
  { id: 3, title: 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΒΡΑ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Νικόλαος Ράπτης', declaredUsers: []},
  { id: 4, title: 'ΔΟΜΕΣ ΔΕΔΟΜΕΝΩΝ', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 8, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χατζηκοκολάκης', declaredUsers: []},
  { id: 5, title: 'ΑΡΧΙΤΕΚΤΟΝΙΚΗ', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Γκιζόπουλος', declaredUsers: []},
  { id: 6, title: 'ΑΝΑΛΥΣΗ 1', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Δοδός', declaredUsers: []},
  { id: 7, title: 'ΑΝΑΛΥΣΗ 2', grade: -1, declared: -1, semesterId: 3, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 8, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χελιώτης', declaredUsers: []},
  { id: 8, title: 'ΣΗΜΑΤΑ ΚΑΙ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 3, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Λουκά' },
  { id: 9, title: 'ΑΛΓΟΡΙΘΜΟΙ ΚΑΙ ΠΟΛΥΠΛΟΚΟΤΗΤΑ', grade: -1, declared: -1, semesterId: 4, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Ζησιμόπουλος', declaredUsers: []},
  { id: 10, title: 'ΔΙΚΤΥΑ ΕΠΙΚΟΙΝΩΝΙΩΝ 1', grade: -1, declared: -1, semesterId: 4, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 4, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Δεν θυμάμαι', declaredUsers: []},
  { id: 11, title: 'ΛΕΙΤΟΥΡΓΙΚΑ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 5, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χατζηευθυμιάδης', declaredUsers: []},
  { id: 12, title: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΣΤΗΜΑΤΟΣ', grade: -1, declared: -1, semesterId: 6, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Ρουσουπούλου', declaredUsers: []},
  // Add other courses with appropriate semesterId
];

export default function Register({ db }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  

  const docUser = {
    name: name,
    surname: surname,
    id: id,
    email: email,
    password: password,
    role: 'student',
    courses: userCourses,
  };

  async function handleRegister(e) {
    e.preventDefault();
  
    // Check if email and password are not empty
    if (!email || !password) {
      // Handle empty fields if needed
      return;
    }
  
    try {
      // Log to check if the function is being called
      console.log('handleRegister function called');
  
      // Check if the email ends with "@prof" to determine the role
      const role = email.toLowerCase().endsWith('@prof') ? 'professor' : 'student';
  
      // Create an empty courses array for professors
      const courses = role === 'professor' ? [{id: -1}] : userCourses;
  
      // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key as the email of the user
      const ref_user = doc(db, 'users', email);
      const res_user = await setDoc(ref_user, { ...docUser, role, courses }); // Include the role and courses in the document
      console.log('User document created successfully');
  
      // Create a reference to the 'all_courses' document
      const ref_all_courses = doc(db, 'courses', 'all_courses');
  
      // Fetch the 'all_courses' document
      const all_courses_doc = await getDoc(ref_all_courses);
  
      // Check if the 'all_courses' document exists
      if (!all_courses_doc.exists()) {
        // If the 'all_courses' document doesn't exist, create it with userCourses
        const res_all_courses = await setDoc(ref_all_courses, { courses: userCourses });
        console.log('Courses document created successfully');
      } else {
        console.log('Courses document already exists');
      }
  
      onOpen();
    } catch (e) {
      console.error('Error during registration:', e.message);
    }
  }

  function AlertDialogExample() {
    const cancelRef = React.useRef();

    const handleLoginClick = () => {
      onClose();
      window.location.href = '/login';
    };

    return (
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Επιτυχής Εγγραφή!
            </AlertDialogHeader>

            <AlertDialogBody>Επιστρέψτε στην είσοδο</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="solid" bg='#26abcc' onClick={handleLoginClick}>
                ΕΠΙΣΤΡΟΦΗ
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }

  return (
    <div className='register'>
      <form style={{ height: '600px', width: '600px' }} onSubmit={handleRegister} className='register-container'>
        <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>ΕΓΓΡΑΦΗ</h2>
        <Flex justifyContent='center' alignItems='center' flexDirection='row' >
        <Image src={logo} alt="logo" marginRight="60px" width="250px"/>
          <Flex justifyContent='center' alignItems='center' flexDirection='column'>
            <div className='register-row'>
              &nbsp;&nbsp;&nbsp;
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='filled'
                placeholder='Email'
              />
            </div>
            <div className='register-row'>
              &nbsp;&nbsp;&nbsp;
              <Input
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='filled'
                placeholder='Ονομα'
              />
            </div>
            <div className='register-row'>
              &nbsp;&nbsp;&nbsp;
              <Input
                type='surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant='filled'
                placeholder='Επιθετο'
              />
            </div>
            <div className='register-row'>
              &nbsp;&nbsp;&nbsp;
              <Input
                type='id'
                value={id}
                onChange={(e) => setId(e.target.value)}
                variant='filled'
                placeholder='ΑΜ'
              />
            </div>
            <div className='register-row'>
              &nbsp;&nbsp;&nbsp;
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant='filled'
                placeholder='Password'
              />
            </div>
        </Flex>
        </Flex>
        <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='30px'>
              {/* Pass onOpen as the function to be executed onClick */}
              <Button variant='outline' color='#26abcc' borderColor='#26abcc' type='submit' onClick={onOpen}>
                ΕΓΓΡΑΦΗ
              </Button>
              <a href='/login' style={{ marginTop: '20px', fontWeight: 'bold', textAlign: 'center' }} onClick={() => window.location.href = '/login'}>
                Έχετε ήδη λογαριασμό; Συνδεθείτε!
              </a>
            </Flex>
      </form>

      {/* Render the AlertDialogExample component only if it is open */}
      {isOpen && <AlertDialogExample />}
    </div>
);
}