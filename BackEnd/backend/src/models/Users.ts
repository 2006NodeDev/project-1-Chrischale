import { Role } from './Roles'

export class User{
    userId: number // primary key
    username: string // not null, unique
    password: string // not null
    firstName: string // not null
    lastName: string // not null
    address: string
    email: string // not null
    roleDetails: Role // not null
    image?:string
}