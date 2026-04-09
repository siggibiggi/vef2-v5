export type NewsItem = {
    id: string | number;
    title: string;
    slug: string;
    intro?: string;
    excerpt?: string;
    content: any;
}

export type NewsItemResult = {
    data: Array<NewsItem>;
    meta?: {
        pagination: {
            start: number;
            limit: number;
            total: number;
        }
    };
}

export type HomepageData = {
    title: string;
    content: any;
}

export type NewsState = "initial" | "loading" | "error" | "data" | "empty";