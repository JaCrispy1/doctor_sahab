import React from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
const Checkout = () => {
    const {state} = useLocation();
    console.log(state);
    return (
        <Flex direction={"column"}>
            <Text>{state.time}</Text>
            <Box>
                <Button>Pay with Khalti</Button>
            </Box>
        </Flex>
    );
}

export default Checkout;