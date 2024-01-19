import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
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
//import { courses } from '../../Utils/Objects/objects';
import './Register.css';

export default function Register({ db }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook is needed to control the dialog state

  // Handles the register functionality of the user
  async function handleRegister(e) {
    e.preventDefault();

    // Check if email and password are not empty
    if (!email || !password || !name || !surname || !id) {
      setMessage('Συμπληρώστε όλα τα πεδία');
      return;
    }

    // This object represents the user's form that will be saved in our database.
    const docUser = {
      name: name,
      surname: surname,
      id: id,
      email: email,
      password: password,
      role: 'student',
      courses: [
        {
          name: 'Επικοινωνία Ανθρώπου Μηχανής',
          grade: 10,
        },
      ],
    };

    try {
      // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key as the email of the user
      const ref_user = doc(db, 'users', email);
      // Then we use setDoc to push the 'user object' to the referenced user
      const res_user = await setDoc(ref_user, docUser);

      // At the same time, we push all the courses to the db.
      // We create a 'courses' collection with primary key 'all_courses'

      // Open the AlertDialog when registration is successful
      onOpen();
    } catch (e) {
      console.log(e);
    }
  }

  function AlertDialogExample() {
    const cancelRef = React.useRef();

    // Handle the click event for the button in the alert
    const handleLoginClick = () => {
      onClose(); // Close the alert
      // Redirect to the login page
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
              {/* Add a button to return to the login page */}
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
                  Έχετε ήδη λογαριασμό; Συνδεθείτε
                </a>
              </Flex>
        </form>

        {/* Render the AlertDialogExample component only if it is open */}
        {isOpen && <AlertDialogExample />}
      </div>
  );
}
