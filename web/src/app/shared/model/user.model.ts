
export enum Permission {
    Administrator = "ADMIN",
    User = "USER",
    Authenticated = "Authentifiziert"
}

export interface Credentials {
    email: string;
    password: string;
}

export interface RegisterModel {
    email: string;
    name: string;
    gender: string;
    pass1: string;
    pass2: string;
}

export interface PokerUser {
    id: number;
    email: string;
    name: string;
    pass: string;
    admin: boolean;
    permissions: Permission[];
}