import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
//import { courses } from '../../Utils/Objects/objects';
import './Register.css'

export default function Register({db}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  // Handles the register functionality of the user
  async function handleRegister(e){
    e.preventDefault()
    
    // This object represents the user's form that it will be saved in our database.
    const docUser = {
        email: email,
        password: password,
        role: "student",
        courses: [
          {
            name: "Επικοινωνία Ανθρώπου Μηχανής",
            grade: 10
          }
        ]
    };

    try{
       // Create a Firebase doc that 'points' to our db and creates a collection "users" with primary key the email of the user
      const ref_user = doc(db, "users", email)
      // Then we use setDoc to push the 'user object' to the referenced user
      const res_user = await setDoc(ref_user, docUser);

      // At the same time we push all the courses at the db.
      // We create a 'courses' collection with primary key 'all_courses'
      const ref_courses = doc(db, "courses", "all_courses")
      const res_courses = await setDoc(ref_courses, courses);

      // Redirect to login route
      window.location.href = '/login.html'

    }catch(e){
      console.log(e)
    }
    
  }
    return(
      <div className='register'>
            <form style={{height: '400px'}} onSubmit={handleRegister} className='register-container'>
                <h2 style={{ textAlign: 'center' }}>ΕΙΣΟΔΟΣ</h2>
                <div className='register-row'>
                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='register-row'>
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop='20px'>
                    <Button variant='outline' color="#26abcc" borderColor="#26abcc" type='submit'>ΕΓΓΡΑΦΗ</Button>
                    <a href='/login' style={{ marginTop: '20px'}} onClick={() => window.location.href = '/login'}>Already have an Account?</a>
                </Flex> 
            </form>
        </div>
    )
}