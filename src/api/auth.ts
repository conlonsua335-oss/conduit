import { apiRequest } from "./client"

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
};

export type UserResponse = { user: User };

export const getCurrentUserApi = () => {
    return apiRequest<UserResponse>("/user")
}

export const loginApi = (email:string, password:string) => {
    return apiRequest<UserResponse>("/users/login", {
        method:"POST",
        body: JSON.stringify({user: {email,password}})
    })
}

export const registerApi = (name:string,email:string, password:string) => {
    return apiRequest<UserResponse>("/users", {
        method:"POST",
        body: JSON.stringify({user: {name,email,password}})
    })
}