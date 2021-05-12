import axios from 'axios';
import { ProductForm } from 'models/ProductForm';
import { ProductsList } from 'models/ProductsList';
import { endpointURL, headers } from './config';

export const addProduct = async (product: ProductForm) => {
    const fd = new FormData();
    const { file, ...submitValues } = product;
    type Values = typeof submitValues;
    type Key = keyof Values;
    let blob = null! as Blob;
    if (file) {
        blob = new Blob([file]);
    }
    (Object.keys(submitValues) as any[]).forEach((key: Key) => fd.append(key, submitValues[key].toString()))
    fd.append("image", blob);
    for (const p of fd.entries()) {
        console.log(p)
    }
    return axios.post(endpointURL + `/app/add-product/${product.subcategoryid}`, fd, { headers });
}
export const getAllProducts = async () => {
    return axios.get<ProductsList[]>(endpointURL + `/app/all-products`, { headers });
}