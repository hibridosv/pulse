import { Employee } from "./employee";

export interface CashDrawer {
    id:          string;
    name:        string;
    employee_id?: string;
    printer?:     null;
    status:      number;
    created_at:  Date;
    updated_at:  Date;
    employee?:    Employee;
}