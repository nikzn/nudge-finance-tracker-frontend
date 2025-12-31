import { userDetails } from "./authResponse.interface";

export interface LoginRequest {
  username_or_email: string;
  password: string;
}

export interface LoginResponse {
access_token:string,
refresh_token:string,
token_type:string
user:userDetails
}

export interface SigupRequest{
    username: string,
  email: string,
  password: string,
  full_name: string

}

export interface RegisterResponse{
    
}