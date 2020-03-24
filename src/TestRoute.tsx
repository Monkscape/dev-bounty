import React from 'react'
import { useParams } from 'react-router-dom'

const TestRoute = () => {

    const {path} = useParams()

    return (
        <div>
            {path}
        </div>
    )
}

export default TestRoute
