import { INewCategory } from '@/components/cash/NewCategoryModal';
import cashAccountStore from '@/stores/cash/cashAccountStore';
import cashExpensesStore from '@/stores/cash/cashExpensesStore';
import { useEffect } from 'react';


export function useCashExpensesLogic(reset: any, setValue: any) {
 const { loadExpenses, loadExpensesCategories, expenses, expensesCategories, createExpense, createExpenseCategory, error } = cashExpensesStore();
 const { loadAccount, accounts } = cashAccountStore();


    useEffect(() => {
        loadExpenses(`cash/expenses/find`);
        loadExpensesCategories(`cash/categories`);
        loadAccount(`cash/accounts?sort=-created_at&filterWhere[status]==1`);
    }, [loadExpenses, loadExpensesCategories, loadAccount]);


    const onSubmit = async (data: any) => {
        data.status = 1;
        data.cash_accounts_id = data.payment_type == 1 ? null : data.cash_accounts_id;
        data.invoice = data.type == 0 ? 0 : data.invoice;
        data.invoice_number = data.type == 0 ? null : data.invoice_number;
        const success = await createExpense(data);
            if (success) {
                reset()
                setValue("payment_type", 1)
            }
        }

    const createCategory = async (data: INewCategory)=>{
        const success = await createExpenseCategory(data);
        if (success) {
            reset();
        }
    }

    return { onSubmit, createCategory };
}
