import React from 'react'
import { LeaderboardEntry } from './types'
import { userInfo } from 'os'

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

const Leaderboard = ({entries}: LeaderboardProps) => {

    let rank = 0;

    const mapEntryToRow = (entry: LeaderboardEntry) => {
        return <tr id={entry.user}><td>{++rank}</td><td>{entry.user}</td><td>{entry.points}</td></tr>
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
