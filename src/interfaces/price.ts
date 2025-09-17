export interface Price {
    id:         string;
    product_id: string;
    qty:        number;
    price:      number;
    price_type: number;
    created_at: Date;
    updated_at: Date;
}