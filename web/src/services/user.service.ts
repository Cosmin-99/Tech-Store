import axios from 'axios';
import { endpointURL } from './config';
export const userLogin = async (email: string, password: string) => {
    const credentials = {
        email: email,
        password: password
    }
    return axios.post(endpointURL + "/auth/login", credentials);
}
export const loginWithGoogle = async (tokenId: string) => {
    return axios.post(endpointURL + "/auth/google-login", { tokenId });
}
export const sendResetEmail = async (postData: {
    email: string
}) => {
    return axios.post(endpointURL + "/auth/reset-password", postData);
}