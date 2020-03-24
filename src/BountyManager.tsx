import React, {useEffect, useState} from 'react'
import BountyForm from './BountyForm'
import BountyList from './BountyList'
import _ from 'lodash';
import { BountyObject, StatusType } from './types'
import Leaderboard from './Leaderboard';
import { Switch, Route, NavLink, useParams} from 'react-router-dom';
import LinkToolbar from './LinkToolbar';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, PageHeader, Button, Typography, Row  } from 'antd';
import * as stubData from './stubData';

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

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

    const filterOn = (status: StatusType) => (bounty: BountyObject) => bounty.status === status

    const noFilter = (bounty: BountyObject) => true

    const getSortedList = (filterMethod: (bounty: BountyObject) => boolean) => {
        return _(bounties).filter(filterMethod).sortBy('upvotes').reverse().value()
    }

    const getLeaderboardData = () => {
        return _(bounties).groupBy('answeredBy').map((objs, key) => ({
            user: key,
            points: _.sumBy(objs, 'upvotes'),
            rank: 0
        })).sortBy('points').filter(entry => entry.user !== 'undefined').reverse().value()
    }

    return (
        <Layout className="layout" style={{height: '100%'}}>
            <Header title="test">
                <LinkToolbar/>
            </Header>
            <Title style={{margin: 15}}>Developer Bounty</Title>
            <Switch>
                <Route path="/bounties/completed/:user">
                    <Content style={{padding: '0 50px'}}>
                        <UserHeader />
                        <BountyList content={getSortedList(filterOn('COMPLETE'))} updateBountyList={updateBountyList}/>
                        <Button type="primary">
                            <NavLink to="/leaderboard">Return</NavLink>
                        </Button>
                    </Content>
                    </Route>
                    <Route path="/bounties/requested">
                        <Row gutter={16} justify='center'>
                            <BountyForm submit={addBountyToList}/>
                        </Row>
                        <BountyList content={getSortedList(filterOn('REQUESTED'))} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/bounties/completed">
                        <BountyList content={getSortedList(filterOn('COMPLETE'))} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/bounties/presenting">
                        <BountyList content={getSortedList(filterOn('PRESENTING'))} updateBountyList={updateBountyList}/>
                    </Route>
                    <Route path="/bounties">
                        <BountyList content={getSortedList(noFilter)} updateBountyList={updateBountyList}/>
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
