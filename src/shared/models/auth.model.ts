export interface IAuthResponse {
    accessToken: string,
    user: {
        id: number,
        email: string
    }
}