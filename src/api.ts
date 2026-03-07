import { TransactionsResponseSchema } from "./schemas";
// Route Handlers are used as a server proxy between the client and the backend API.
// They allow client components to request data without exposing private environment variables
// like API_URL and help avoid CORS issues.

// Rule of thumb:
// - If the request comes from a Client Component, use a Route Handler.
// - If the request runs on the Server (Server Components or Server Actions),
//   you can call the backend API directly using process.env variables.
export async function getSalesByDate(date: string) {
  //http://localhost:3001 -> url front
  ///admin/sales/api?transactionDaste -> handle route
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api/?transactionDate=${date}`;
  const req = await fetch(url);
  const response = await req.json();
  const transactions = TransactionsResponseSchema.parse(response);
  return transactions;
}
