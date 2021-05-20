
export enum Permission {
    Administrator = "ADMIN",
    User = "USER",
    Authenticated = "Authentifiziert"
}

export interface Credentials {
    email: string;
    password: string;
}

export interface PokerUser {
    id: number;
    email: string;
    name: string;
    pass: string;
    admin: boolean;
    permissions: Permission[];
}