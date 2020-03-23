import React, { useState, ChangeEvent } from 'react'
import { BountyObject } from './types'

interface BountyFormProps {
    submit: (bounty: BountyObject) => void;
}

const BountyForm = ({submit}: BountyFormProps) => {

    let [user, setUser] = useState('nmille2');
    let [description, setDescription] = useState('');
    let [title, setTitle] = useState('');

    const onClick = () => {
        submit({
            id: 0,
            user,
            description,
            title,
            answer: '',
            upvotes: 0,
            status: 'REQUESTED'
        })
        clearForm()
    }

    const clearForm = () => {
        setDescription('');
        setTitle('');
    }

    const handleInput_description = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.currentTarget.value)
    }

    const handleInput_title = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" onChange={handleInput_title} value={title}/>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" onChange={handleInput_description} value={description}/>
            <button type='submit' onClick={onClick}>Submit</button>
        </div>
    )
}

export default BountyForm
