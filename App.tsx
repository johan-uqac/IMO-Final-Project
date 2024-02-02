import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Component from '@components/Component'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
}
