export interface BountyObject {
    id: number;
    user: string;
    title: string;
    description?: string;
    answer?: string;
    answeredBy?: string;
    upvotes: number;
    status: StatusType;
}

export type StatusType = 'COMPLETE' | 'REQUESTED' | 'PRESENTING';

export interface LeaderboardEntry {
    user: string;
    points: number;
    rank: number;
}