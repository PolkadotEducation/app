import Head from "next/head";
import "./globals.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
