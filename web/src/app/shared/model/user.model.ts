
export enum Permission {
    Administrator = "ADMIN",
    User = "USER",
    Authenticated = "Authentifiziert"
}

export interface Credentials {
    username: string;
    password: string;
}