import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkToolbar = () => {
    return (
        <p>
            <NavLink to="/bounties/requested">Requests</NavLink> |
            <NavLink to="/bounties/completed">Completed</NavLink> |
            <NavLink to="/bounties">All</NavLink> |
            <NavLink to="/leaderboard">Leaderboard</NavLink>
        </p>
    )
}

export default LinkToolbar
