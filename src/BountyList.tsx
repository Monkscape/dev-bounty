import React from 'react'
import Bounty from './Bounty'
import { BountyObject } from './types'
import { useParams } from 'react-router-dom'
import _ from 'lodash';

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
        <div className="columns">
            {getFilteredList().map(bounty => <Bounty bounty={bounty} upvote={upvote} complete={submit}/>)}
        </div>
    )
}

export default BountyList
