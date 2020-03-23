export interface BountyObject {
    id: number;
    user: string;
    title: string;
    description?: string;
    answer?: string;
    answeredBy?: string;
    upvotes: number;
    status: 'COMPLETE' | 'REQUESTED';
}

export interface LeaderboardEntry {
    user: string;
    points: number;
}