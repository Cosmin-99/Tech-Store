export interface ProductForm {
    name: string;
    price: number;
    discount: number;
    subcategoryid: number | string;
    file: File | null;
}