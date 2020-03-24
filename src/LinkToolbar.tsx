import React from 'react'
import { NavLink } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


const LinkToolbar = () => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
        >
            <Menu.Item key="1">
                <NavLink to="/bounties/requested">Requests</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to="/bounties/completed">Completed</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/bounties/presenting">Upcoming Presentations</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/bounties">All</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
            </Menu.Item>
        </Menu>
    )
}

export default LinkToolbar
