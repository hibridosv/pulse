import { useEffect } from 'react';
import cashExpensesStore from '@/stores/cash/cashExpensesStore';
import cashAccountStore from '@/stores/cash/cashAccountStore';
import { INewCategory } from '@/components/cash/NewCategoryModal';


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
        await createExpense(data);
            if (!error) {
                reset()
                setValue("payment_type", 1)
            }
        }

    const createCategory = async (data: INewCategory)=>{
        await createExpenseCategory(data);
        if (!error) {
            reset();
        }
    }

    return { expenses, expensesCategories, accounts, onSubmit, createCategory };
}
