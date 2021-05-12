import axios, { AxiosResponse } from "axios"
import { generateFormData } from "utils/utilFunctions";
import { Category } from "../models/Category";
import { endpointURL, headers } from "./config"

export const getCategories = () => {
    return axios.get<Category[]>(endpointURL + "/app/categories", { headers });
}
export const getAllSubcategories = () => {
    return axios.get<(Category & { categoryname: string })[]>(endpointURL + "/app/sub-categories", { headers })
}

export const getSubcategoriesById = (id: string): Promise<AxiosResponse<{
    categoryName: string
    subcategories: Category[];
}>> => {
    return axios.get(endpointURL + `/app/sub-categories/${id}`);
}
export const addSubcategory = (subcategory: {
    name: string;
    file: File | null;
    categoryid: number;
}) => {
    const fd = new FormData();
    generateFormData(fd, subcategory);
    return axios.post(endpointURL + `/app/add-subcategory/${subcategory.categoryid}`, fd, { headers })
}
export const deleteSubcategory = async (id: string | number) => {
    await axios.delete(endpointURL + `/app/subcategory/${id}`, { headers });
}

export const addCategory = async (obj: {
    name: string;
    file: File | null;
}) => {
    const fd = new FormData();
    generateFormData(fd, obj);
    return axios.post(endpointURL + "/app/add-category", fd, { headers });
}