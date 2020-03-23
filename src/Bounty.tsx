import React, { useState, ChangeEvent } from 'react'
import { BountyObject } from './types'

interface BountyProps {
    bounty: BountyObject;
    upvote: (bounty: BountyObject) => void;
    complete: (bounty: BountyObject) => void;
}

const Bounty = ({bounty, upvote, complete}: BountyProps) => {

    let [detailView, setDetailView] = useState(false)
    let [answer, setAnswer] = useState(bounty.answer)

    const handleClick = () => {
        setDetailView(!detailView)
    }

    const handleUpvoteClick = () => {
        upvote(bounty)
    }

    const handleSubmitClick = () => {
        complete({...bounty, answer, answeredBy: 'nmille2', status: 'COMPLETE'})
    }

    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const expandedView = () => {
        return (
            <div>
                {getDetails()}
                <textarea value={answer} onChange={onAnswerChange}/>
                <button type='button' onClick={handleClick}>Minimize</button>
                {(bounty.status === 'REQUESTED') 
                    ? <button type='button' onClick={handleSubmitClick}>Submit!</button>
                    : <></>
                }
            </div>
        )
    }

    const getDetails = () => {
        return (
            <>
                <h2>Title: {bounty.title}</h2>
                <h3>Reward: {bounty.upvotes} points</h3>
                <p>Description: {bounty.description}</p>
                <p>Requested by: {bounty.user}</p>
                <button type='button' onClick={handleUpvoteClick}>^</button>
            </>
        );
    }

    const defaultView = () => {
        return (
            <>
                <div onClick={handleClick}>{getDetails()}</div>
            </>
        )
    }

    let displayView = (detailView) ? expandedView() : defaultView()

    return (
        <>
            {(detailView) ? expandedView() : defaultView()}
        </>
    )
}

export default Bounty
