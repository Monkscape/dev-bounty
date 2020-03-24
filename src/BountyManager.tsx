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
import { Layout, Menu, Breadcrumb, PageHeader, Button } from 'antd';
import * as stubData from './stubData';

const { Header, Content, Footer } = Layout;

const UserHeader = () => {
    const {user} = useParams()

    return (
        <h2>Claimed bounties by: {user}</h2>
    )
}


const BountyManager = () => {

    let [bounties, setBounties] = useState(stubData.data);

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
        <Layout className="layout" style={{height: '100%'}}>
            <Header title="test">
                <LinkToolbar/>
            </Header>
            <PageHeader title="Developer Bounty"/>
            <Switch>
                <Route path="/bounties/completed/:user">
                    <Content style={{padding: '0 50px'}}>
                        <UserHeader />
                        <BountyList content={getSortedList(filterOnComplete)} updateBountyList={updateBountyList}/>
                        <Button type="primary">
                            <NavLink to="/leaderboard">Return</NavLink>
                        </Button>
                    </Content>
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
            </Switch>
            <Footer style={{textAlign: "center"}}>Discover ©2020</Footer>
        </Layout>
    )
}

export default BountyManager
