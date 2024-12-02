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
    Reason: string | null;
    Creator: string | null;
    Platform: string | null;
    Ratings: null | number;
    'Poster Path': string | undefined;
}

