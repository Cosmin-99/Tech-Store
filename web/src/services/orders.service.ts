import axios, { AxiosResponse } from "axios"
import { generateFormData } from "utils/utilFunctions";
import { Category } from "../models/Category";
import { endpointURL, headers } from "./config"

export const createOrder = (data: any) => {
    return axios.post(`${endpointURL}/order/add-order`, data, { headers });
}
export const getCurrentOrders = () => {
    return axios.get(`${endpointURL}/order/get-current-orders`, { headers });
}