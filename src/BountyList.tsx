import React from 'react'
import Bounty from './Bounty'
import { BountyObject } from './types'
import { useParams } from 'react-router-dom'
import _ from 'lodash';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Row } from 'antd';

const { Header, Content, Footer } = Layout;

interface BountyListProps {
    content: BountyObject[];
    updateBountyList: (bounty: BountyObject) => void;
}

const BountyList = ({content, updateBountyList}: BountyListProps) => {

    let {user} = useParams()

    console.log(user)

    const handleUpdate = (bounty: BountyObject) => {
        updateBountyList(bounty)
    }

    const getFilteredList = () => {
        if (typeof user === 'undefined') 
            return content;
        else
            return _(content).filter(bounty => bounty.answeredBy === user).value()
    }
    
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {getFilteredList().map(bounty => <Bounty bounty={bounty} handleUpdate={handleUpdate}/>)}
            </Row>
        </div>
    )
}

export default BountyList
