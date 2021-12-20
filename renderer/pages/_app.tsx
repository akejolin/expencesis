import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head'
import { store } from '../redux/store';

import './style.css'

function App({
  Component, pageProps,
}: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}



App.getInitialProps = async ({ Component, ctx }: any) => {
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  }
}


export default App