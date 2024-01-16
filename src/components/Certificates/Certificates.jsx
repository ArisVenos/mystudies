// CertificateApplication.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Button, FormControl, FormLabel, Select, Text, VStack, Center } from '@chakra-ui/react';

/*
const CertificateApplication = () => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [message, setMessage] = useState('');

  const handleApply = () => {
    // Simulate applying for a certificate without a backend
    if (selectedCertificate) {
      setMessage(`Η αιτηση σας για "${selectedCertificate}" ηταν επιτυχης`);
    } else {
      setMessage('Παρακαλω επιλεξτε καποιο πιστοποιητικο');
    }
  };

  const certificatesData = [
    { id: 1, title: 'ΣΙΤΙΣΗ' },
    { id: 2, title: 'ΠΤΥΧΙΟ' },
    { id: 3, title: 'ΠΑΥΣΗ ΣΠΟΥΔΩΝ' },
  ];*/

  const CertificateApplication = ({ db }) => {
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
            setMessage('You have already applied for this certificate.');
            return;
          }
  
          // Add the selected certificate to the user's applied certificates
          await updateDoc(userCertificateRef, {
            certificates: arrayUnion({ title: selectedCertificate, status: 'pending' }),
          });
  
          setMessage('Certificate application successful!');
        } else {
          setMessage('User not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error applying for certificate:', error.message);
        setMessage('Error applying for certificate. Please try again.');
      }
    };


  return (
    <Center>
      <VStack align="start" spacing={4}  p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="600px" mt={100}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          ΑΙΤΗΣΗ ΠΙΣΤΟΠΟΙΗΤΙΚΟΥ
        </Text>
        <FormControl>
          <FormLabel>Πιστοποιητικο:</FormLabel>
          <Select
            placeholder="Επιλεξτε Πιστοποιητικο"
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
        {message && <Text color={message.includes('successful') ? 'green.500' : 'red.500'}>{message}</Text>}
        <Button colorScheme="teal" onClick={handleApply} disabled={!selectedCertificate}>
          Επιβεβαιωση
        </Button>
      </VStack>
    </Center>
  );
};

export default CertificateApplication;



