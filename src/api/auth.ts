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
    return apiRequest<UserResponse>("/user/login", {
        method:"POST",
        body: JSON.stringify({user: {email,password}})
    })
}

export const registerApi = (email:string, password:string,name:string) => {
    return apiRequest<UserResponse>("/user/register", {
        method:"POST",
        body: JSON.stringify({user: {email,password,name}})
    })
}