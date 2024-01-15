'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from 'src/theme'

const queryClient = new QueryClient()

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted) { return null }

    return (
        <CacheProvider>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </QueryClientProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </CacheProvider>
    )
}