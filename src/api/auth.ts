import type { UserResponse } from "../types"
import { apiRequest } from "./client"

export const getCurrentUserApi = () => {
    return apiRequest<UserResponse>("/users")
}

export const loginApi = (email:string, password:string) => {
    return apiRequest<UserResponse>("/users/login", {
        method:"POST",
        body: JSON.stringify({user: {email,password}})
    })
}

export const registerApi = (username:string,email:string, password:string) => {
    return apiRequest<UserResponse>("/users", {
        method:"POST",
        body: JSON.stringify({user: {username,email,password}})
    })
}