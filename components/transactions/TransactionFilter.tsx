"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";

//always load on client
// const Calendar = dynamic(()=> import("react-calendar"),{
//   ssr:false
// });
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export function TransactionFilter() {
  const [date, setDate] = useState<Value>(new Date());
  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd");
  // Executes a React Query request when the selected date changes
  // queryKey identifies the cached query (sales filtered by date)
  // queryFn calls the function that fetches the sales from the API
  // React Query automatically handles caching, loading state, and refetching
  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  //transaction total
  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0;
  // if(isLoading) return 'loading'
  //if(data)
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relavite items-start">
        <div className="lg:sticky lg:top-10">
          {/* podemos agregar la opcion de locale='es' en caso de que exista un error en el calendario */}
          <Calendar value={date} onChange={setDate} />
        </div>

        <div>
          {isLoading && "Loading"}
          {data ? (
            data.length ? (
              data.map((transaction) => (
                <TransactionSummary
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <p className="text-lg text-center"> There are not sales</p>
            )
          ) : null}

          <p className="my-5 text-lg font-bold text-right">
            Day total:{" "}
            <span className="font-normal">{formatCurrency(total)}</span>
          </p>
        </div>
      </div>
    </>
  );
}
