import axios from "axios"
import { endpointURL, headers } from "./config"

export const createOrder = (data: any) => {
    return axios.post(`${endpointURL}/order/add-order`, data, { headers });
}
export const getCurrentOrders = () => {
    return axios.get(`${endpointURL}/order/get-current-orders`, { headers });
}