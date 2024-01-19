import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { Button, Input, Flex, useDisclosure } from '@chakra-ui/react';
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

export default function Register({ db }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userCourses = [
    { id: 1, title: 'ΕΙΣΑΓΩΓΗ ΣΤΟΝ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', grade: -1, declared: -1, semesterId: 1 },
    { id: 2, title: 'ΛΟΓΙΚΗ ΣΧΕΔΙΑΣΗ', grade: -1, declared: -1, semesterId: 1 },
    { id: 3, title: 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΒΡΑ', grade: -1, declared: -1, semesterId: 1 },
    { id: 4, title: 'ΔΟΜΕΣ ΔΕΔΟΜΕΝΩΝ', grade: -1, declared: -1, semesterId: 2 },
    { id: 5, title: 'ΑΡΧΙΤΕΚΤΟΝΙΚΗ', grade: -1, declared: -1, semesterId: 2 },
    { id: 6, title: 'ΑΝΑΛΥΣΗ 1', grade: -1, declared: -1, semesterId: 2 },
    { id: 7, title: 'ΑΝΑΛΥΣΗ 2', grade: -1, declared: -1, semesterId: 3 },
    { id: 8, title: 'ΣΗΜΑΤΑ ΚΑΙ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 3 },
    { id: 9, title: 'ΑΛΓΟΡΙΘΜΟΙ ΚΑΙ ΠΟΛΥΠΛΟΚΟΤΗΤΑ', grade: -1, declared: -1, semesterId: 4 },
    { id: 10, title: 'ΔΙΚΤΥΑ ΕΠΙΚΟΙΝΩΝΙΩΝ 1', grade: -1, declared: -1, semesterId: 4 },
    { id: 11, title: 'ΛΕΙΤΟΥΡΓΙΚΑ ΣΥΣΤΗΜΑΤΑ', grade: -1, declared: -1, semesterId: 5 },
    { id: 12, title: 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΣΥΣΤΗΜΑΤΟΣ', grade: -1, declared: -1, semesterId: 6 },
    // Add other courses with appropriate semesterId
  ];

  const docUser = {
    email: email,
    password: password,
    role: 'student',
    courses: userCourses,
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (!email || !password) {
      // Handle empty fields if needed
      return;
    }

    try {
      const ref_user = doc(db, 'users', email);
      const res_user = await setDoc(ref_user, docUser);

      const ref_courses = doc(db, 'courses', 'all_courses');
      const res_courses = await setDoc(ref_courses, { courses: userCourses });

      onOpen();
    } catch (e) {
      console.log(e);
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
      <form style={{ height: '400px', width: '300px' }} onSubmit={handleRegister} className='register-container'>
        <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>ΕΓΓΡΑΦΗ</h2>
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
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant='filled'
            placeholder='Password'
          />
        </div>
        <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='30px'>
          <Button variant='outline' color='#26abcc' borderColor='#26abcc' type='submit' onClick={onOpen}>
            ΕΓΓΡΑΦΗ
          </Button>
          <a href='/login' style={{ marginTop: '20px' }} onClick={() => window.location.href = '/login'}>
            Already have an Account?
          </a>
        </Flex>
      </form>

      {isOpen && <AlertDialogExample />}
    </div>
  );
}

