export interface BountyObject {
    id: number;
    user: string;
    title: string;
    description?: string;
    answer: Answer[];
    claimedBy?: string;
    upvotes: number;
    status: StatusType;
}

export type StatusType = 'COMPLETE' | 'REQUESTED' | 'PRESENTING';

export type Answer = {
    answer?: string;
    user: string;
}

export interface LeaderboardEntry {
    user: string;
    points: number;
    rank: number;
}