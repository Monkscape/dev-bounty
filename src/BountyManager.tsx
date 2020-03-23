import React, {useEffect, useState} from 'react'
import BountyForm from './BountyForm'
import BountyList from './BountyList'
import * as lodash from 'lodash';
import { BountyObject } from './types'

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
        let list = lodash.filter(bounties, listBounty => listBounty.id !== bounty.id)
        list.push(bounty)
        setBounties(list)
        console.log(bounty)
    }

    const filter = (filter: (bounty: BountyObject) => boolean) => lodash.filter(bounties, filter)

    const filterOnComplete = (bounty: BountyObject) => bounty.status === "COMPLETE"
    const filterOnRequested = (bounty: BountyObject) => bounty.status === "REQUESTED"
    
    const getSortedList = (filterMethod: (bounty: BountyObject) => boolean) => {
        return lodash.sortBy(filter(filterMethod), 'upvotes').reverse()
    }

    return (
        <div>
            <h1>Developer Bounties</h1>
            <BountyForm submit={addBountyToList}/>
            <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
            <BountyList content={getSortedList(filterOnRequested)} updateBountyList={updateBountyList}/>
        </div>
    )
}

export default BountyManager
