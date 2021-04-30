import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';
import { endpointURL, headers } from './config';
export const userLogin = async (email: string, password: string): Promise<AxiosResponse<User>> => {
    const credentials = {
        email: email,
        password: password
    }
    return axios.post(endpointURL + "/auth/login", credentials);
}
export const userRegister = async (user: User) => {
    return axios.post(endpointURL + "/auth/register", user);
}
export const loginWithGoogle = async (tokenId: string) => {
    return axios.post(endpointURL + "/auth/google-login", { tokenId });
}
export const sendResetEmail = async (postData: {
    email: string
}) => {
    return axios.post(endpointURL + "/auth/reset-password", postData);
}
export const verifyToken = async () => {
    return axios.post(endpointURL + "/auth/verify-token", null, { headers });
}