import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultLayout } from '@layouts';
import { RouteGuard } from '@components';
import { UserProvider } from '@contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <UserProvider>
      <RouteGuard>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </RouteGuard>
    </UserProvider>
    </>
  )
}

export default MyApp
