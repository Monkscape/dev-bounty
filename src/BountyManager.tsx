import React, {useEffect, useState} from 'react'
import BountyForm from './BountyForm'
import BountyList from './BountyList'
import _ from 'lodash';
import { BountyObject } from './types'
import Leaderboard from './Leaderboard';
import { Switch, Route, NavLink, useParams } from 'react-router-dom';
import LinkToolbar from './LinkToolbar';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

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
        <Layout className="layout">
            <Header>
                <LinkToolbar/>
                <h1>Developer Bounties</h1>
            </Header>
            <Switch>
                <Content style={{padding: '0 50px'}}>
                    <Route path="/bounties/completed/:user">
                        <UserHeader />
                        <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
                        <NavLink to="/leaderboard">Return</NavLink>
                    </Route>
                    <Route path="/bounties/requested">
                        <BountyForm submit={addBountyToList}/>
                        <BountyList content={getSortedList(filterOnRequested)} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/bounties/completed">
                        <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/bounties">
                        <BountyList content={getSortedList(bounty => true)} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/leaderboard">
                        <Leaderboard entries={getLeaderboardData()}/>
                    </Route>
                </Content>
            </Switch>
        </Layout>
    )
}

export default BountyManager
