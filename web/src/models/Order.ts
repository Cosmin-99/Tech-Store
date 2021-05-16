export interface Order {
    id: number | string;
    date_of_placement: string;
    address: string;
    subtotal: number;
    products: string;
    owner_id: number;
    card: string;
}