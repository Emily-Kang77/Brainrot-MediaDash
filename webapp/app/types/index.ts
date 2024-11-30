export interface Query {
    user_id: string;
    query: string;
    genre?: string | null;
    mood_keywords?: string | null;
    previous_titles?: string | null;
    subscriptions?: string[] | null;
}

export interface Result {
    Title: string;
    reason: string | null;
    creator: string | null;
    platform: string | null;
    rating: null | number;
}

