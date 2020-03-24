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
        setAnswer('')
    }

    const onAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value)
    }

    const expandedView = () => {
        return (
            <div>
                {getDetails()}
                <label>
                    Your Answer: 
                    <textarea value={answer} onChange={onAnswerChange}/>
                </label>
                <button type='button' className="button is-primary" onClick={handleClick}>Minimize</button>
                {(bounty.status === 'REQUESTED') 
                    ? <button type='button' onClick={handleSubmitClick}>Submit!</button>
                    : <></>
                }
                <button type='button' onClick={handleUpvoteClick}>^</button>
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
            </>
        );
    }

    const defaultView = () => {
        return (
            <>
                <div onClick={handleClick}>{getDetails()}</div>
                <button type='button' onClick={handleUpvoteClick}>^</button>
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
