'use client';
import { ViewTitle } from "@/components/ViewTitle";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/LoadingPage";
import { ExpensesForm } from "@/components/cash/expenses/ExpensesForm";
import { ToasterMessage } from "@/components/toaster-message";
import { ExpensesTable } from "@/components/cash/expenses/ExpensesTable";
import { NewCategoryModal } from "@/components/cash/NewCategoryModal";



export default function Page() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <LoadingPage />;
  }

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
    <NewCategoryModal isShow={true} onClose={() => {}} />
    <ToasterMessage />
  </div>
  )}
