import React, { useState, ChangeEvent, useEffect } from 'react'
import {Card, Col, Button, Form, Input, Typography, Select} from 'antd';
import 'antd/dist/antd.css'
import _ from 'lodash';
import { BountyObject } from './types'

const { Paragraph, Title, Text } = Typography;

const { Option } = Select;

interface BountyProps {
    bounty: BountyObject;
    handleUpdate: (bounty: BountyObject) => void;
}

const Bounty = ({bounty, handleUpdate}: BountyProps) => {

    const submittedUserArray = _(bounty.answer).map(answer => answer.user).uniq().value()

    let [activeTab, setActiveTab] = useState<'problem'|'answer'>('problem')
    let [answer, setAnswer] = useState('')
    let [winner, setWinner] = useState('')
    let [selectError, setSelectError] = useState(false)

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
        handleUpdate({...bounty, answer: [...bounty.answer, {answer, user: 'nmille2'}]})
        setAnswer('')
        setActiveTab('answer')
    }

    const handleCompletionClick = () => {
        if (winner !== '') {
            handleUpdate({...bounty, claimedBy: winner, status: 'COMPLETE'})
            setAnswer('')
            setActiveTab('problem')
        } else {
            setSelectError(true)
        }
    }

    const handleCOPClick = () => {
        handleUpdate({...bounty, status: 'PRESENTING'})
    }

    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const onWinnerChange = (value: string) => {
        setWinner(value)
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
                    <Form.Item label="Best Answer" hasFeedback validateStatus={(selectError) ? "error" : ""}>
                        <Select onChange={onWinnerChange}>
                            {submittedUserArray.map(user => <Option value={user}>{user}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='default' onClick={handleCompletionClick}>Close</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    const showAnswer = () => {
        return (
            bounty.answer.map(answer => <>
                <Title level={4}>{(answer.user === bounty.claimedBy) ? 'Claimed' : 'Answer'} by {answer.user}</Title>
                <Paragraph ellipsis={{rows: 2, expandable: true}} style={{textAlign: 'left'}}>{answer.answer}</Paragraph>
            </>)
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
                {(typeof bounty.claimedBy !== 'undefined') ? <p>Claimed by: {bounty.claimedBy}</p> : <></>}
            </>
        )
    }

    const DisplayButton = () => 
        ((bounty.status === 'COMPLETE') 
            ? <Button type='default' onClick={handleCOPClick}>Add to COP</Button>
            : <Button type='primary' onClick={handleUpvoteClick}>Boost</Button>)
        
    

    const contentList = {
        problem: problem(),
        answer: <>{showAnswer()}{(bounty.status === 'REQUESTED') ? submissionView() : <></>}</>
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
