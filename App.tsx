import React from 'react'
import { SafeAreaView } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Component from '@components/Component'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={{
          backgroundColor: 'lightgrey',
          flex: 1,
        }}
      >
        <Component />
      </SafeAreaView>
    </QueryClientProvider>
  )
}
