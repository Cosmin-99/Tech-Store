import axios from "axios"
import { Category } from "../models/Category";
import { endpointURL, headers } from "./config"

export const getCategories = () => {
    return axios.get<Category[]>(endpointURL + "/app/categories", { headers });
}