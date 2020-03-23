import React, {useState} from 'react'

interface TestProps {
    name: string;
    number?: number;
}


const Test = ({name}: TestProps) => {

    const [state, setstate] = useState('Hello');

    return (
        <div>
            <p>Hello {name}! {state}</p>
        </div>
    )
}

export default Test
