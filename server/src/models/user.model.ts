export interface CurrentUser extends Express.User {
    id: number
    firstname: string
    lastname: string
    email: string
}