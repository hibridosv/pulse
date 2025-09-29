'use client'
import { numberToMoney } from "@/lib/utils";
import useConfigStore from "@/stores/configStore";

export interface ShowTotalProps {
 quantity: number;
 text: string;
 number?: boolean;
}

export function ShowTotal(props: ShowTotalProps) {
  const { quantity = 0, text, number = false } = props;
  const { system } = useConfigStore();

  return (
    <div className="bg-bg-content rounded-lg shadow-sm border border-bg-subtle p-4 flex flex-col items-center justify-center gap-1">
      <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
        {text}
      </span>
      <span className="text-3xl font-bold text-text-base">
        {number ? quantity : numberToMoney(quantity, system)}
      </span>
    </div>
  );
}