export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface Task {
    id: number;
    title: string;
    sort: number;
}

export interface Column {
    id: number;
    title: string;
    sort: number;
    tasks: Task[];
}

export interface Project {
    id: number;
    title: string;
    columns: Column[];
}

export interface Auth {
    auth: {
        user: User;
    };
}
export interface Permission {
    id: number;
    name: string;
    created_at: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    created_at: string;
}

export interface FlashMessage {
    message?: string;
    success?: string;
    error?: string;
}