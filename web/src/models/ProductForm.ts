export interface ProductForm {
    name: string;
    price: number;
    discount: number;
    subcategoryid: number | string;
    description: string;
    file: File | null;
}