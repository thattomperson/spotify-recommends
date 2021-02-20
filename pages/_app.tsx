import './global.css';
import Head from 'next/head'
import { SkeletonTheme } from 'react-loading-skeleton';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <title>Recommends</title>
    </Head>

    <SkeletonTheme>
      <div className="mx-auto max-w-screen-lg">
        <Component {...pageProps} />
      </div>
    </SkeletonTheme>
    </>
  );
};

export default MyApp;
