import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

function App() {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <Button colorScheme="green" onClick={incrementCount}>Click me</Button>
            <p>Count: {count}</p>
        </div>
    );
}

export default App;
