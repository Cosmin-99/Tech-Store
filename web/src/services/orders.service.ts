import axios from "axios"
import { Order } from "models/Order";
import { endpointURL, headers } from "./config"

export const createOrder = (data: any) => {
    return axios.post(`${endpointURL}/order/add-order`, data, { headers });
}
export const getCurrentOrders = () => {
    return axios.get(`${endpointURL}/order/get-current-orders`, { headers });
}
export const getOrderById = (id: number | string) => {
    return axios.get<Order>(`${endpointURL}/order/order/${id}`, { headers })
}