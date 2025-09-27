'use client'

import { numberToMoney } from "@/lib/utils";
import cashAccountStore from "@/stores/cash/cashAccountStore";
import useConfigStore from "@/stores/configStore";
import { StatCardSkeleton } from "@/components/skeleton/StatCardSkeleton";

interface IAccount {
  id: number;
  bank: string;
  balance: number;
  account?: string; 
}

export function CashTotal() {
  const { system } = useConfigStore();
  const { accounts, loading } = cashAccountStore();

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        {[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
      {accounts.map((record: IAccount) => (
        <div 
          key={record.id} 
          className="bg-bg-content rounded-xl shadow-sm border border-bg-subtle overflow-hidden transform hover:-translate-y-1 transition-transform duration-200"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-grow">
                <p className="text-sm font-medium text-text-muted truncate">{record.account || 'Saldo Principal'}</p>
                <h3 className="text-lg font-bold text-text-base truncate">{record.bank}</h3>
              </div>
            </div>
            <div className="mt-4 text-right">
              <p className={`text-3xl font-bold ${record.balance >= 0 ? 'text-text-base' : 'text-danger'}`}>
                {numberToMoney(record.balance, system)}
              </p>
            </div>
          </div>
          <div className="bg-bg-subtle/50 h-1.5"></div>
        </div>
      ))}
    </div>
  );
}
