import axios, { AxiosResponse } from "axios"
import { Product } from "models/Product";
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
export const deleteCategory = async (id: string | number) => {
    return axios.delete(endpointURL + `/app/category/${id}`, { headers });
}

export const addCategory = async (obj: {
    name: string;
    file: File | null;
}) => {
    const fd = new FormData();
    generateFormData(fd, obj);
    return axios.post(endpointURL + "/app/add-category", fd, { headers });
}
export const updateCategory = async (data: {
    name: string;
    file?: File | null;
}, id: string | number) => {
    const fd = new FormData();
    generateFormData(fd, data);
    return axios.put(`${endpointURL}/app/update-category/${id}`, fd, { headers });
}
export const getCategoryById = async (id: string | number) => {
    return axios.get<Category>(`${endpointURL}/app/category/${id}`);
}
export const searchProducts = async (data: {
    searchString: string;
}) => {
    return axios.post<Product[]>(`${endpointURL}/app/search`, data, { headers });
}