export interface IUser {
    _id?     : string
    name     : string
    email    : string
    password : string

    role     : IUserRol
    photo    : string

    confirmed: boolean
    token    : string | null

    createdAt?: string
    updatedAt?: string
}


export type IUserRol = 'client' | 'admin'
