import './global.css';
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }) => {
  return (<>
    <Head>
      <title>Recommends</title>
    </Head>

    <div className="mx-auto max-w-screen-2xl">
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  </>);
};

export default MyApp;
