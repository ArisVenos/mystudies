import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { Button, Spacer, Heading, Box, Text, VStack, Center, HStack, useToast } from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';

const AppliedCertificatesList = ({ db }) => {
  const toast = useToast();

  const handleNewClick = () => {
    // Change the window location to the desired page
    window.location.href = "/certificates";
  };

  const [appliedCertificates, setAppliedCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printingSuccess, setPrintingSuccess] = useState(false);

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

  const handlePrintClick = () => {
    setTimeout(() => {
      setPrintingSuccess(true);

      toast({
        title: 'Επιτυχής εκτύπωση',
        description: 'Το πιστοποιητικό εκτυπώθηκε επιτυχώς.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Center>
      <VStack align="center" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="600px" mt={100}>
      <Heading mb={4}  marginTop="-30px" margin="1px 40px 1000" padding="4px" borderBottom="4px solid #4f4f50" fontWeight="bold" color="white" bg="#26abcc">
          ΠΙΣΤΟΠΟΙΗΤΙΚΑ
        </Heading>
        <HStack style={{ marginTop: "40px" }} bg="#26abcc" p={2} borderBottom="4px solid #4f4f50" width="150%">
          <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white"  >
            ΑΙΤΗΣΕΙΣ
          </Text>
          <Spacer />
          <Text fontSize="2xl" fontWeight="bold" mb={2} bg="#26abcc" color="white" width="30%" >
            ΚΑΤΑΣΤΑΣΗ
          </Text>
        </HStack>
        {loading ? (
          <Text>Loading...</Text>
        ) : appliedCertificates.length === 0 ? (
          <Text>ΔΕΝ ΥΠΑΡΧΕΙ ΚΑΠΟΙΑ ΑΙΤΗΣΗ.</Text>
        ) : (
          <VStack align="center" spacing={2} w="100%">
            {appliedCertificates.map((certificate, index) => (
                <Box key={index} borderWidth="2px" borderRadius="md" p={2} w="150%" display="flex" justifyContent="space-between">
                  <Text fontSize="2xl" fontWeight="bold">{certificate.title}</Text>
                  <Spacer />
                  <Text fontSize="2xl" fontWeight="bold">{certificate.status}</Text>
                  <Button size="xs" h="28px" borderRadius="10" colorScheme="teal" leftIcon={<FaPrint />} onClick={handlePrintClick}>
                  </Button>
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

