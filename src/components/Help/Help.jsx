import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  VStack,
  Center,
  Button,
} from '@chakra-ui/react';

const HelpInterface = () => {
  const helpTopics = [
    {
      id: 1,
      title: 'Ποιες ημερομηνίες γίνεται η δήλωση μαθημάτων;',
      content: 'Για την περίοδο δήλωσης μαθημάτων του τρέχοντος εξαμήνου θα υπάρξει σχετική ανακοίνωση από τη γραμματεία.',
    },
    {
      id: 2,
      title: 'Πως γίνεται η δήλωση μαθημάτων;',
      content: 'Για να δηλώσετε το μάθημα που επιθυμείτε, πατήστε το κουμπί "ΔΗΛΩΣΕΙΣ" και στη συνέχεια για να βρείτε το επιθμητό μάθημα αναζητήστε το στο εξάμηνο το οποίο ανήκει. Αφού επιλέξετε το μάθημα πατήστε το κουμπί "ΔΗΛΩΣΗ". Τέλος, για να οριστικοποιήσετε τη δήλωση πατήστε το κουμπί "ΟΡΙΣΤΙΚΗ ΔΗΛΩΣΗ".',
    },
    {
      id: 3,
      title: 'Πως μπορώ να δω τις βαθμολογίες μου;',
      content: 'Πατήστε το κουμπί "ΒΑΘΜΟΛΟΓΙΕΣ" και στη συνέχεια θα εμφανιστούν οι βαθμολογίες σας ανά εξάμηνο.',
    },
    {
      id: 4,
      title: 'Πως μπορώ να δω τα μαθήματα που έχω δηλώσει;',
      content: 'Πατήστε το κουμπί "ΔΗΛΩΣΕΙΣ" και μετά το κουμπί "ΙΣΤΟΡΙΚΟ ΔΗΛΩΣΕΩΝ" και στη συνέχεια θα εμφανιστούν τα μαθήματα που έχετε δηλώσει ανά εξάμηνο.',
    },
  ];


  return (
    <Center>
      <VStack marginRight="200px" align="start" spacing={4} p={4} bgColor="white" borderRadius="md" boxShadow="md" w="600px" h="600px" mt={100}>
        <Accordion width="130%" allowToggle>
          {helpTopics.map((topic) => (
            <AccordionItem key={topic.id}>
              <h2>
                <AccordionButton>
                  <Text fontSize="2xl" bg="#26abcc"  as="span" flex="1" textAlign="left">
                    {topic.title}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {topic.content}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Center>
  );
};

export default HelpInterface;

  