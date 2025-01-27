export interface LoginResponse {
    token: string;
    user: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface JWTPayload {
    exp: number;
    iat: number;
    sub: string;
}
