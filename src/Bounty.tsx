import React, { useState, ChangeEvent, useEffect } from 'react'
import {Card, Col, Button, Form, Input, Typography} from 'antd';
import 'antd/dist/antd.css'
import { BountyObject } from './types'

const { Paragraph, Title, Text } = Typography;

interface BountyProps {
    bounty: BountyObject;
    handleUpdate: (bounty: BountyObject) => void;
}

const Bounty = ({bounty, handleUpdate}: BountyProps) => {

    let [activeTab, setActiveTab] = useState<'problem'|'answer'>('problem')
    let [answer, setAnswer] = useState((typeof bounty.answer !== 'undefined') ? bounty.answer : '')

    useEffect(() => console.log(`Constructing card for ${bounty.id}`)
    , [])

    const tabList: {key: 'problem' | 'answer', tab: 'problem' | 'answer'}[] = [
        {
            key: 'problem',
            tab: 'problem'
        },
        {
            key: 'answer',
            tab: 'answer'
        }
    ]
    const handleUpvoteClick = () => {
        handleUpdate({...bounty, upvotes: bounty.upvotes + ((bounty.status === 'PRESENTING') ? 3 : 1)})
    }

    const handleAnswerClick = () => {
        handleUpdate({...bounty, answer, answeredBy: 'nmille2', status: 'COMPLETE'})
        setAnswer('')
        setActiveTab('problem')
    }

    const handleCOPClick = () => {
        handleUpdate({...bounty, status: 'PRESENTING'})
    }

    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const submissionView = () => {
        return (
            <div>
                <Form>
                    <Form.Item>
                        <Input.TextArea rows={5} value={answer} onChange={onAnswerChange}></Input.TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button type='default' onClick={handleAnswerClick}>Answer</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    const showAnswer = () => {
        return (
            <>
                <Title level={4}>Answer by {bounty.answeredBy}</Title>
                <Paragraph ellipsis={{rows: 2, expandable: true}} style={{textAlign: 'left'}}>{bounty.answer}</Paragraph>
            </>
        )
    }

    const setTab = (tab: string) => {
        if (tab === 'answer' || tab === 'problem')
            setActiveTab(tab)
    }

    const problem = () => {
        return (
            <>
                <p>Requested by: {bounty.user}</p>
                {(typeof bounty.answeredBy !== 'undefined') ? <p>Answered by: {bounty.answeredBy}</p> : <></>}
            </>
        )
    }

    const DisplayButton = () => 
        ((bounty.status === 'COMPLETE') 
            ? <Button type='default' onClick={handleCOPClick}>Add to COP</Button>
            : <Button type='primary' onClick={handleUpvoteClick}>Boost</Button>)
        
    

    const contentList = {
        problem: problem(),
        answer: (bounty.status === 'REQUESTED') ? submissionView() : showAnswer()
    }

    return (
        <Col span={8}>
        <Card
            hoverable
            title={<Title level={4}>{bounty.title}</Title>}
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={key => setTab(key)}
            style={{margin: "2.5%"}}
        >
            <Title level={4}>Reward: {bounty.upvotes} points</Title>
            <Paragraph ellipsis={{rows: 2, expandable: true}} style={{textAlign: 'left'}}>{bounty.description}</Paragraph>
            {contentList[activeTab]}
            {DisplayButton()}
        </Card>
        </Col>
    )
}

export default Bounty
