import * as express from "express"
import { IPropertyRequest } from "../../interfaces/properties"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string
                isAdm: boolean
            }
            createUser: {
                id: string
                name: string
                email: string
                password: string
                isAdm: boolean
                isActive: boolean
                createdAt: Date
                updatedAt: Date
            } | IPropertyRequest
            userId: string
            isAdm: boolean
        }
    }
}