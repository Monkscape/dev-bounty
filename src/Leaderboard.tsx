import React from 'react'
import { LeaderboardEntry } from './types'
import {NavLink} from 'react-router-dom'

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

    const mapEntryToRow = (entry: LeaderboardEntry) => {
        return (
            <tr id={entry.user}>
                <td>{calculateRank(entry.points)}</td>
                <td><NavLink to={`/bounties/completed/${entry.user}`}>{entry.user}</NavLink></td>
                <td>{entry.points}</td>
            </tr>
        )
    }

    return (
        <table>
            <thead>
                <th>Rank #</th>
                <th>User</th>
                <th>Total Points</th>
            </thead>
            <tbody>
                {entries.map(mapEntryToRow)}
            </tbody>
        </table>
    )
}

export default Leaderboard
