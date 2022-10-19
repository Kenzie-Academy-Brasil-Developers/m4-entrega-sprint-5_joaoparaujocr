export interface IUserRequest {
    name: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUser {
    id: string
    name: string
    email: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
}


export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
}

export interface IUserCreate {
    id: string
    name: string
    email: string
    password: string
    isAdm: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
};

export interface IUserCreateResponse {
    name: string
    email: string
    isAdm: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
    id: string
}