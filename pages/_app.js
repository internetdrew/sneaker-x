import '@/styles/globals.css';
import { Layout } from '../components';
import { StateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import {
  Hydrate,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <StateContext>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </StateContext>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}
