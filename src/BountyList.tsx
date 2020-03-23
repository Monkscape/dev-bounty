import React from 'react'
import Bounty from './Bounty'
import { BountyObject } from './types'

interface BountyListProps {
    content: BountyObject[];
    updateBountyList: (bounty: BountyObject) => void;
}

const BountyList = ({content, updateBountyList}: BountyListProps) => {

    const upvote = (bounty: BountyObject) => {
        updateBountyList({...bounty, upvotes: bounty.upvotes + 1})
    }

    const submit = (bounty: BountyObject) => {
        updateBountyList({...bounty, answer: bounty.answer, answeredBy: 'nmille2', status: 'COMPLETE'})
    }

    return (
        <>
            {content.map(bounty => <Bounty bounty={bounty} upvote={upvote} complete={submit}/>)}
        </>
    )
}

export default BountyList
