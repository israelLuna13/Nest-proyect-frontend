"use server"
import { TransactionFilter } from "@/components/transactions/TransactionFilter";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import Heading from "@/components/UI/Heading";
import { format } from "date-fns";
import { getSalesByDate } from "@/src/api";

export default async function SalesPage() {
  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");
  //   React Query Hydration in Next.js

  // When the page loads, the server component uses prefetchQuery to fetch data and store it in the React Query cache.

  // Then dehydrate(queryClient) converts that cache into a JSON serializable object that can be sent to the client.

  // HydrationBoundary sends this state to the browser.

  // On the client side, when useQuery runs with the same queryKey, React Query finds the data in the hydrated cache, so it does not perform another request.

  // When the user changes the date, the queryKey changes. If the data is not in the cache, React Query performs a new request from the client, without re-running the server component.

  // Prefetch data on the server and store it in React Query cache.
  // dehydrate() serializes the cache and sends it to the client.
  // HydrationBoundary restores the cache so useQuery can reuse the data
  // without making another request.
  //It will automatically perform a query with the current date
  await queryClient.prefetchQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
  });
  return (
    <>
      <Heading>Sales</Heading>
      <p className="text-lg">
        You can view  sales, You use calendar to filter them
      </p>

      {/* dehydrate extracts the cache from QueryClient and converts it into serializable JSON. */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  );
}
