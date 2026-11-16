import Head from 'next/head';
import '../styles/global.css';
import Attribution from '../components/Attribution';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Attribution />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-adsense-account" content="ca-pub-5073699952112357" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5073699952112357" crossOrigin="anonymous"></script>
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
