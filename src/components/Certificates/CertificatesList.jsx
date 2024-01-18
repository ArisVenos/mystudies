import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { Button, Spacer, Box, Text, VStack, Center, HStack } from '@chakra-ui/react';

const AppliedCertificatesList = ({ db }) => {
  const handleNewClick = () => {
    // Change the window location to the desired page
    window.location.href = "/certificates";
  };
  const [appliedCertificates, setAppliedCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the user email from local storage
    const userEmail = localStorage.getItem('email');

    const fetchAppliedCertificates = async () => {
      try {
        // Fetch user certificates from Firestore
        const userCertificatesCollection = collection(db, 'users');
        const userCertificateRef = doc(userCertificatesCollection, userEmail);
        const userCertificateDoc = await getDoc(userCertificateRef);

        if (userCertificateDoc.exists()) {
          const userData = userCertificateDoc.data();
          const certificates = userData.certificates || [];
          setAppliedCertificates(certificates);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied certificates:', error.message);
        setLoading(false);
      }
    };

    fetchAppliedCertificates();
  }, [db]);

  return (
    <Center>
      <VStack marginRight="200px" align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="600px" mt={100}>
        <HStack bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" width="150%">
          <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white"  >
            ΑΙΤΗΣΕΙΣ
          </Text>
          <Spacer />
          <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white" >
            ΚΑΤΑΣΤΑΣΗ
          </Text>
        </HStack>
        {loading ? (
          <Text>Loading...</Text>
        ) : appliedCertificates.length === 0 ? (
          <Text>ΔΕΝ ΥΠΑΡΧΕΙ ΚΑΠΟΙΑ ΑΙΤΗΣΗ.</Text>
        ) : (
          <VStack align="start" spacing={2} w="100%">
            {appliedCertificates.map((certificate, index) => (
                <Box key={index} borderWidth="2px" borderRadius="md" p={2} w="150%" display="flex" justifyContent="space-between">
                  <Text fontSize="2xl" fontWeight="bold">{certificate.title}</Text>
                  <Text fontSize="2xl" fontWeight="bold">{certificate.status}</Text>
                </Box>
            ))}
          </VStack>
        )}
      </VStack>
      <Box bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" position="absolute" top={210} left={20}>
        <Button bg="#26abcc" color="white" onClick={handleNewClick} >
          ΝΕΑ ΑΙΤΗΣΗ
        </Button>
      </Box>  
    </Center>
  );
};

export default AppliedCertificatesList;

















// CertificateList.jsx
/*import React, { useState } from 'react';
import { VStack, Text, Badge } from '@chakra-ui/react';

const CertificateList = () => {
  // Sample data for certificates and their statuses
  const certificateData = [
    { id: 1, title: 'ΣΙΤΙΣΗ', status: 'approved' },
    { id: 2, title: 'ΠΤΥΧΙΟ', status: 'pending' },
    { id: 3, title: 'ΠΑΥΣΗ ΣΠΟΥΔΩΝ', status: 'disapproved' },
    // Add more certificates and their statuses as needed
  ];

  return (
    <VStack align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" mt={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Λίστα Αιτήσεων Πιστοποιητικών
      </Text>
      {certificateData.map((certificate) => (
        <VStack key={certificate.id} align="start" spacing={1} p={2} bgColor="gray.100" borderRadius="md" w="100%">
          <Text fontSize="lg" fontWeight="bold">
            {certificate.title}
          </Text>
          <Badge colorScheme={getStatusColor(certificate.status)}>{certificate.status}</Badge>
        </VStack>
      ))}
    </VStack>
  );
};

// Helper function to determine the color of the status badge
const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'green';
    case 'disapproved':
      return 'red';
    case 'pending':
      return 'gray';
    default:
      return 'gray';
  }
};

export default CertificateList;*/
