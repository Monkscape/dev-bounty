import React, { useState, ChangeEvent } from 'react'
import { BountyObject } from './types'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

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

    const handleInput_description = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    const handleInput_title = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        // <div>
        //     <label htmlFor="title">Title:</label>
        //     <input type="text" id="title" onChange={handleInput_title} value={title}/>
        //     <label htmlFor="description">Description:</label>
        //     <textarea id="description" onChange={handleInput_description} value={description}/>
        //     <button type='submit' onClick={onClick}>Submit</button>
        // </div>
        <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal">
            <Form.Item label="Title">
                <Input onChange={handleInput_title} value={title}/>
            </Form.Item>
            <Form.Item label="Description">
                <Input.TextArea onChange={handleInput_description} value={description}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onClick}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default BountyForm
