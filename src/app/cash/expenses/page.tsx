'use client';
import { ExpensesForm } from "@/components/cash/expenses/ExpensesForm";
import { ExpensesTable } from "@/components/cash/expenses/ExpensesTable";
import { NewCategoryModal } from "@/components/cash/NewCategoryModal";
import { ToasterMessage } from "@/components/toaster-message";
import { ViewTitle } from "@/components/ViewTitle";
import useModalStore from "@/stores/modalStorage";



export default function Page() {
  const { modals, closeModal} = useModalStore();


  return (
    <div className="grid grid-cols-1 md:grid-cols-10 pb-10">
    <div className="col-span-4 border-r md:border-primary">
        <ViewTitle text="Gastos" />
        <div className="p-4">
          <ExpensesForm />
        </div>
    </div>
    <div className="col-span-6">
        <ViewTitle text="Ultimos movimientos" />
        <div className="p-4">
          <ExpensesTable />
        </div>
    </div> 
    <NewCategoryModal isShow={modals.NewCategory} onClose={() => closeModal("NewCategory")} />
    <ToasterMessage />
  </div>
  )}
