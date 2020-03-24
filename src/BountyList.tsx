import React from 'react'
import Bounty from './Bounty'
import { BountyObject } from './types'
import { useParams } from 'react-router-dom'
import _ from 'lodash';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

interface BountyListProps {
    content: BountyObject[];
    updateBountyList: (bounty: BountyObject) => void;
}

const BountyList = ({content, updateBountyList}: BountyListProps) => {

    let {user} = useParams()

    console.log(user)

    const upvote = (bounty: BountyObject) => {
        updateBountyList({...bounty, upvotes: bounty.upvotes + 1})
    }

    const submit = (bounty: BountyObject) => {
        updateBountyList({...bounty, answer: bounty.answer, answeredBy: 'nmille2', status: 'COMPLETE'})
    }

    const getFilteredList = () => {
        if (typeof user === 'undefined') 
            return content;
        else
            return _(content).filter(bounty => bounty.answeredBy === user).value()
    }
    
    return (
        <Content>
            {getFilteredList().map(bounty => <Bounty bounty={bounty} upvote={upvote} complete={submit}/>)}
        </Content>
    )
}

export default BountyList
