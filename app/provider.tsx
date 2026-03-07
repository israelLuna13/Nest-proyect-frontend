'use client'

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// React Query provider configuration for the application

// Creates a QueryClient instance with global query settings
// staleTime prevents immediate refetching on the client after hydration
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // cache data for 1 minute
      },
    },
  })
}

// Stores a single QueryClient instance for the browser
let browserQueryClient: QueryClient | undefined = undefined

// Returns a QueryClient depending on the environment
function getQueryClient() {
  if (isServer) {
    // On the server: create a new QueryClient for each request
    return makeQueryClient()
  } else {
    // On the client: reuse a single QueryClient instance (singleton)
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

// Provides React Query context to the entire application
// Allows components to use useQuery, useMutation, etc.
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}