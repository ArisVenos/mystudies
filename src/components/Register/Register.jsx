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
  { id: 1, title: 'ΕΙΣΑΓΩΓΗ ΣΤΟΝ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Παναγιώτης Σταματόπουλος' },
  { id: 2, title: 'ΛΟΓΙΚΗ ΣΧΕΔΙΑΣΗ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Πασχάλης' },
  { id: 3, title: 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΒΡΑ', grade: -1, declared: -1, semesterId: 1, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Νικόλαος Ράπτης' },
  { id: 4, title: 'ΔΟΜΕΣ ΔΕΔΟΜΕΝΩΝ', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 8, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χατζηκοκολάκης' },
  { id: 5, title: 'ΑΡΧΙΤΕΚΤΟΝΙΚΗ', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Γκιζόπουλος' },
  { id: 6, title: 'ΑΝΑΛΥΣΗ 1', grade: -1, declared: -1, semesterId: 2, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Δοδός' },
  { id: 7, title: 'ΑΝΑΛΥΣΗ 2', grade: -1, declared: -1, semesterId: 3, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 8, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χελιώτης' },
  { id: 8, title: 'ΣΗΜΑΤΑ ΚΑΙ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 3, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 6, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Λουκά' },
  { id: 9, title: 'ΑΛΓΟΡΙΘΜΟΙ ΚΑΙ ΠΟΛΥΠΛΟΚΟΤΗΤΑ', grade: -1, declared: -1, semesterId: 4, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Ζησιμόπουλος' },
  { id: 10, title: 'ΔΙΚΤΥΑ ΕΠΙΚΟΙΝΩΝΙΩΝ 1', grade: -1, declared: -1, semesterId: 4, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 4, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Δεν θυμάμαι' },
  { id: 11, title: 'ΛΕΙΤΟΥΡΓΙΚΑ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 5, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Χατζηευθυμιάδης' },
  { id: 12, title: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΣΤΗΜΑΤΟΣ', grade: -1, declared: -1, semesterId: 6, type: 'ΥΠΟΧΡΕΩΤΙΚΟ', ects: 7, basegrade: 5, calculated : 'ΝΑΙ', prof: 'Ρουσουπούλου' },
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
  
      // Log the userCourses to check if it contains the expected data
      console.log('userCourses:', userCourses);
  
      // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key as the email of the user
      const ref_user = doc(db, 'users', email);
      const res_user = await setDoc(ref_user, docUser);
      console.log('User document created successfully');
  
      // Create or update the 'all_courses' document with userCourses
      const ref_all_courses = doc(db, 'courses', 'all_courses');
      const res_all_courses = await setDoc(ref_all_courses, { courses: userCourses });
      console.log('Courses document created or updated successfully');
  
      onOpen();
    }  catch (e) {
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