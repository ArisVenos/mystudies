import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import book from "..//images/book.jpg";

const MainPage = () => {
    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <div>
                <Image src={book} height="500" />
                <Flex bg="white" p={2} borderBottom="4px solid #26abcc" justifyContent="center">
                    <Button bg="#26abcc" color="white" variant='outline'>ΒΑΘΜΟΛΟΓΙΕΣ</Button>
                    <Button bg="#26abcc" color="white" variant='outline'>ΠΙΣΤΟΠΟΙΗΤΙΚΑ</Button>  
                    <Button bg="#26abcc" color="white" variant='outline'>ΒΟΗΘΕΙΑ</Button> 
                </Flex>
            </div>
        </Flex>
    );
}

export default MainPage;