import axios from 'axios';
import { Category } from 'models/Category';
import { Product } from 'models/Product';
import { ProductForm } from 'models/ProductForm';
import { ProductsList } from 'models/ProductsList';
import { generateFormData } from 'utils/utilFunctions';
import { endpointURL, headers } from './config';

export const addProduct = async (product: ProductForm) => {
    const fd = new FormData();
    generateFormData(fd, product);
    return axios.post(endpointURL + `/app/add-product/${product.subcategoryid}`, fd, { headers });
}
export const updateProduct = async (product: ProductForm, id: number | string) => {
    const fd = new FormData();
    generateFormData(fd, product);
    return axios.put(`${endpointURL}/app/products/${id}`, fd, { headers });
}
export const getAllProducts = async () => {
    return axios.get<ProductsList[]>(endpointURL + `/app/all-products`, { headers });
}
export const deleteProduct = async (id: string | number) => {
    return axios.delete(endpointURL + `/app/products/${id}`, { headers });
}
export const getProductBySubcategoryId = async (id: string | number) => {
    return axios.get<{
        category: {
            name: string;
            id: number;
        };
        subcategory: Category;
        products: Product[]
    }>(endpointURL + `/app/products/${id}`)
}
export const getProductById = async (id: number | string) => {
    return axios.get<Product>(endpointURL + `/app/product/${id}`);
}
export const getProductsByIdArray = async (data: {
    ids: number[]
}) => {
    return axios.post<Product[]>(`${endpointURL}/app/products-list`, data);
}