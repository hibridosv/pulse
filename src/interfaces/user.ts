export interface User {
    id:                string;
    name:              string;
    email:             string;
    email_verified_at?: Date;
    is_visible:        number;
    status:            number;
    created_at:        Date;
    updated_at:        Date;
}