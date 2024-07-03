import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles/tailwind.scss';
import './styles/App.scss';
import { HelmetProvider } from 'react-helmet-async';
import { AuthContextProvider } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

const rootElement = document.getElementById('app')
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <ChakraProvider>
          <AuthContextProvider>  
            <RouterProvider router={router} />
          </AuthContextProvider>
        </ChakraProvider>
      </HelmetProvider>
    </React.StrictMode>,
  )
}
