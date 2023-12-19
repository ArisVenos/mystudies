import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

function App() {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid black' }}>
                <img src="./logo.png" alt="Logo" style={{ marginRight: 'auto' }} />
                <Button colorScheme="green" onClick={incrementCount}>Click me</Button>
            </div>
            <p>Count: {count}</p>
        </div>
    );
}

export default App;