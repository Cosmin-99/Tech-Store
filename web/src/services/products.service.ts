import axios from 'axios';
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
export const getAllProducts = async () => {
    return axios.get<ProductsList[]>(endpointURL + `/app/all-products`, { headers });
}
export const deleteProduct = async (id: string | number) => {
    return axios.delete(endpointURL + `/app/products/${id}`);
}
export const getProductBySubcategoryId = async (id: string | number) => {
    return axios.get<{
        category: {
            name: string;
            id: number;
        };
        subcategoryName: string;
        products: Product[]
    }>(endpointURL + `/app/products/${id}`)
}
export const getProductById = async (id: number | string) => {
    return axios.get<Product>(endpointURL + `/app/product/${id}`);
}