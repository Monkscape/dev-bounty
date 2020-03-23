import React, {useEffect, useState} from 'react'
import BountyForm from './BountyForm'
import BountyList from './BountyList'
import _ from 'lodash';
import { BountyObject } from './types'
import Leaderboard from './Leaderboard';

const data: BountyObject[] = [
    {
        id: 1,
        user: 'Noah',
        description: 'Test',
        title: 'Test',
        upvotes: 6,
        answer: 'LOL NO',
        answeredBy: 'jkumar2',
        status: 'COMPLETE'
    },
    {
        id: 2,
        user: 'Justin',
        description: 'Test',
        title: 'Test',
        upvotes: 5,
        answer: 'Yes',
        answeredBy: 'nmille2',
        status: 'COMPLETE'
    }
];

const BountyManager = () => {

    let [bounties, setBounties] = useState(data);

    const addBountyToList = (bounty: BountyObject) => {
        setBounties([...bounties, {...bounty, id: bounties.length + 1}]);
    }

    const updateBountyList = (bounty: BountyObject) => {
        let list = _(bounties).filter(listBounty => listBounty.id !== bounty.id).value()
        list.push(bounty)
        setBounties(list)
        console.log(bounty)
    }

    const filter = (filter: (bounty: BountyObject) => boolean) => _(bounties).filter(filter).value()

    const filterOnComplete = (bounty: BountyObject) => bounty.status === "COMPLETE"
    const filterOnRequested = (bounty: BountyObject) => bounty.status === "REQUESTED"
    
    const getSortedList = (filterMethod: (bounty: BountyObject) => boolean) => {
        return _(filter(filterMethod)).sortBy('upvotes').reverse().value()
    }

    const getLeaderboardData = () => {
        return _(bounties).groupBy('answeredBy').map((objs, key) => ({
            user: key,
            points: _.sumBy(objs, 'upvotes')
        })).sortBy('points').reverse().value()
    }

    return (
        <div>
            <h1>Developer Bounties</h1>
            <BountyForm submit={addBountyToList}/>
            <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
            <BountyList content={getSortedList(filterOnRequested)} updateBountyList={updateBountyList}/>
            <Leaderboard entries={getLeaderboardData()}/>
        </div>
    )
}

export default BountyManager
