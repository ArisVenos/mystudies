// CertificateApplication.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Button, Box, Heading, FormControl, FormLabel, Select, Text, VStack, Center } from '@chakra-ui/react';


  const CertificateApplication = ({ db }) => {

    const handleCertificateClick = () => {
      window.location.href = '/certificateslist';
    };

    const certificatesData = [
      { id: 1, title: 'ΣΙΤΙΣΗ' },
      { id: 2, title: 'ΠΤΥΧΙΟ' },
      { id: 3, title: 'ΠΑΥΣΗ ΣΠΟΥΔΩΝ' },
    ];
  
    const [certificates, setCertificates] = useState(certificatesData);
    const [selectedCertificate, setSelectedCertificate] = useState('');
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      // Fetch the available certificates from Firestore
      const fetchCertificates = async () => {
        // You can fetch certificates from Firebase if needed
        // For now, just set the initial certificates
        setCertificates(certificatesData);
      };
  
      fetchCertificates();
    }, []);
  
    const handleApply = async () => {
      try {
        // Get the user email from local storage
        const userEmail = localStorage.getItem('email');
  
        // Check if the user has already applied for the selected certificate
        const userCertificatesCollection = collection(db, 'users');
        const userCertificateRef = doc(userCertificatesCollection, userEmail);
  
        const userCertificateDoc = await getDoc(userCertificateRef);
  
        if (userCertificateDoc.exists()) {
          const userData = userCertificateDoc.data();
          const appliedCertificates = userData.certificates || [];
  
          // Check if the selected certificate is already applied
          if (appliedCertificates.some(cert => cert.title === selectedCertificate)) {
            setMessage('Έχετε ήδη αιτηθεί για αυτό το πιστοποιητικό.');
            return;
          }
  
          // Add the selected certificate to the user's applied certificates
          await updateDoc(userCertificateRef, {
            certificates: arrayUnion({ title: selectedCertificate, status: 'ΣΕ ΕΚΚΡΕΜΟΤΗΤΑ' }),
          });
  
          setMessage('Η αίτησή σας ήταν επιτυχής');
        } else {
          setMessage('Ο χρήστης δεν βρέθηκε. Παρακαλώ συνδεθείτε.');
        }
      } catch (error) {
        console.error('Error applying for certificate:', error.message);
        setMessage('Σφάλμα κατά την υποβολή αίτησης. Παρακαλώ προσπαθήστε ξανά.');
      }
    };


  return (
    <Center>
      <VStack align="center" spacing={4}  p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="500px" mt={100}>
      <Heading mb={4} marginTop="-50px" margin="1px 40px 1000" padding="4px" borderBottom="4px solid #4f4f50" fontWeight="bold" color="white" bg="#26abcc">
          ΠΙΣΤΟΠΟΙΗΤΙΚΑ
        </Heading>
        <Text fontSize="2xl" borderBottom="4px solid #4f4f50" fontWeight="bold" bg="#26abcc" color="white" mb={4} style={{ marginLeft: "-430px", marginTop: "40px" }}>
          ΝΕΑ ΑΙΤΗΣΗ
        </Text>
        <FormControl>
          <FormLabel fontSize="2xl">
            Πιστοποιητικό:
          </FormLabel>
          <Select
            fontSize="xl"
            placeholder="Επιλέξτε Πιστοποιητικό"
            value={selectedCertificate}
            onChange={(e) => setSelectedCertificate(e.target.value)}
          >
            {certificates.map((certificate) => (
              <option key={certificate.id} value={certificate.title}>
                {certificate.title}
              </option>
            ))}
          </Select>
        </FormControl>
        {message && <Text color={message.includes('Η αίτησή σας ήταν επιτυχής') ? 'green.500' : 'red.500'}>{message}</Text>}
        <Button colorScheme="teal" onClick={handleApply} disabled={!selectedCertificate}>
          Επιβεβαίωση
        </Button>
      </VStack>
      <Box bg="#26abcc" borderBottom="4px solid #4f4f50" position="absolute" top={210} left={20}>
        <Button bg="#26abcc" color="white" onClick={handleCertificateClick}>
          ΟΙ ΑΙΤΗΣΕΙΣ ΜΟΥ
        </Button>
      </Box>
    </Center>
  );
};

export default CertificateApplication;



