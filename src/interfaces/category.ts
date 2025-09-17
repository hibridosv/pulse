export interface Category {
    id:            string;
    name:          string;
    pronoun:       string;
    img?:           string;
    category_type: string;
    dependable?:    string;
    principal:     number;
    is_restaurant: number;
    created_at:    Date;
    updated_at:    Date;
}