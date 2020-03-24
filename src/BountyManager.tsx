import React, {useEffect, useState} from 'react'
import BountyForm from './BountyForm'
import BountyList from './BountyList'
import _ from 'lodash';
import { BountyObject } from './types'
import Leaderboard from './Leaderboard';
import { Switch, Route, NavLink, useParams } from 'react-router-dom';
import LinkToolbar from './LinkToolbar';

const data: BountyObject[] = [
    {
        id: 1,
        user: 'nmille2',
        description: 'Test',
        title: 'Test',
        upvotes: 6,
        answer: 'LOL NO',
        answeredBy: 'jkumar2',
        status: 'COMPLETE'
    },
    {
        id: 2,
        user: 'jkumar2',
        description: 'Test',
        title: 'Test',
        upvotes: 5,
        answer: 'Yes',
        answeredBy: 'nmille2',
        status: 'COMPLETE'
    },
    {
        id: 3,
        user: 'jdude',
        description: 'Test',
        title: 'Test',
        upvotes: 2,
        answer: 'Try stackoverflow',
        answeredBy: 'jdude',
        status: 'COMPLETE'
    },
    {
        id: 4,
        user: 'gdude',
        description: 'HELP!',
        title: 'Test',
        upvotes: 6,
        status: 'REQUESTED'
    },
    {
        id: 5,
        user: 'gdude',
        description: 'HELP_2!',
        title: 'Test',
        upvotes: 4,
        status: 'REQUESTED'
    }
];

const UserHeader = () => {
    const {user} = useParams()

    return (
        <h2 className="is-size-1">Claimed bounties by: {user}</h2>
    )
}


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
        return _(filter(filterMethod)).filter().sortBy('upvotes').reverse().value()
    }

    const getLeaderboardData = () => {
        return _(bounties).groupBy('answeredBy').map((objs, key) => ({
            user: key,
            points: _.sumBy(objs, 'upvotes')
        })).sortBy('points').filter(entry => entry.user !== 'undefined').reverse().value()
    }

    return (
        <div>
            <h1>Developer Bounties</h1>
            <Switch>
                <Route path="/bounties/completed/:user">
                    <UserHeader />
                    <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
                    <NavLink to="/leaderboard">Return</NavLink>
                </Route>
                <Route path="/bounties/requested">
                    <LinkToolbar/>
                    <BountyForm submit={addBountyToList}/>
                    <BountyList content={getSortedList(filterOnRequested)} updateBountyList={updateBountyList}/>
                </Route>
                <Route path="/bounties/completed">
                    <LinkToolbar/>
                    <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
                </Route>
                <Route path="/bounties">
                    <LinkToolbar/>
                    <BountyList content={getSortedList(bounty => true)} updateBountyList={updateBountyList}/>
                </Route>
                <Route path="/leaderboard">
                    <LinkToolbar/>
                    <Leaderboard entries={getLeaderboardData()}/>
                </Route>
            </Switch>
        </div>
    )
}

export default BountyManager
