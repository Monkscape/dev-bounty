import React, { useState, ChangeEvent, useEffect } from 'react'
import {Card, Col, Button, Form, Input} from 'antd';
import 'antd/dist/antd.css'
import { BountyObject } from './types'

interface BountyProps {
    bounty: BountyObject;
    upvote: (bounty: BountyObject) => void;
    complete: (bounty: BountyObject) => void;
}

const Bounty = ({bounty, upvote, complete}: BountyProps) => {

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
        upvote(bounty)
    }

    const handleSubmitClick = () => {
        complete({...bounty, answer, answeredBy: 'nmille2', status: 'COMPLETE'})
        setAnswer('')
        setActiveTab('problem')
    }

    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const expandedView = () => {
        return (
            <div>
                <Form>
                    <Form.Item>
                        <Input.TextArea rows={5} value={answer} onChange={onAnswerChange}></Input.TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button type='default' onClick={handleSubmitClick} disabled={(bounty.status === 'COMPLETE')}>Answer</Button>
                    </Form.Item>
                </Form>
            </div>
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
            ? <Button type='default'>Add to COP</Button>
            : <Button type='primary' onClick={handleUpvoteClick}>Boost</Button>)
        
    

    const contentList = {
        problem: problem(),
        answer: expandedView()
    }

    return (
        <Col span={8}>
        <Card
            hoverable
            title={bounty.title}
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={key => setTab(key)}
            style={{margin: "2.5%"}}
        >
            <h3>Reward: {bounty.upvotes} points</h3>
            <p style={{textAlign: "left"}}>{bounty.description}</p>
            {contentList[activeTab]}
            {DisplayButton()}
        </Card>
        </Col>
    )
}

export default Bounty
