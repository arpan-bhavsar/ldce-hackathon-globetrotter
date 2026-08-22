export interface User {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    city?: string;
    country?: string;
    additionalInfo?: string;
    profilePicture?: string;
    language?: string;
    savedDestinations?: string[];
}

export interface Activity {
    _id: string;
    date: string;
    name: string;
    description?: string;
    estimatedCost?: number;
    cost?: number; // Depending on which is used
}

export interface Trip {
    _id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    coverImage?: string;
    activities: Activity[];
}

export interface Post {
    _id: string;
    authorName: string;
    location?: string;
    content: string;
    likes: number;
    comments: number;
    createdAt: string;
}

export interface AdminStats {
    label: string;
    value: string | number;
    trend: string;
    positive: boolean;
}
