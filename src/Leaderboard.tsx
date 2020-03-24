import React from 'react'
import { LeaderboardEntry } from './types'
import {NavLink} from 'react-router-dom'
import { Table } from 'antd';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

const Leaderboard = ({entries}: LeaderboardProps) => {

    let rank = 0;
    let lastPoints: number = 0;

    const calculateRank = (points: number) => {
        let calculatedRank = rank;
        if (points !== lastPoints) {
            calculatedRank = ++rank;
        }
        lastPoints = points;
        return rank;
    }

    const entriesWithRank = entries.map(entry => ({...entry, rank: calculateRank(entry.points)}));
    console.log(entriesWithRank)

    const columns = [
        {
            title: 'Rank #',
            dataIndex: 'rank',
            key: 'rank',
            sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => a.rank - b.rank
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (user: React.ReactNode) => <NavLink to={`/bounties/completed/${user}`}>{user}</NavLink>,
            sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => {
                if (a.user < b.user)
                    return -1
                else if (a.user > b.user)
                    return 1
                else
                    return 0;
            }
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
            sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => a.points - b.points
        }
    ]

    return (
        <Table title={() => <h2>PI Leaderboard</h2>} dataSource={entriesWithRank} columns={columns}/>
    )
}

export default Leaderboard
