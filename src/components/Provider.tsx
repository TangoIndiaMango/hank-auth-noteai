"use client"
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
    children: ReactNode
}
const queryClient = new QueryClient()

const Provider = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider