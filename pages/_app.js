import Head from 'next/head';
import '../styles/global.css';
import Attribution from '../components/Attribution';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Attribution />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
