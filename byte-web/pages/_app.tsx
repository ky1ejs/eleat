import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultLayout } from '@layouts';
import { RouteGuard } from '@components';
import { UserProvider } from '@contexts';
import { SupabaseProvider } from 'supabase/SupabaseProvider';
import { UrqlProvider } from 'graphql/urql/UrqlProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <SupabaseProvider>
      <UrqlProvider>
    <UserProvider>
      <RouteGuard>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </RouteGuard>
    </UserProvider>
    </UrqlProvider>
    </SupabaseProvider>
    </>
  )
}

export default MyApp
