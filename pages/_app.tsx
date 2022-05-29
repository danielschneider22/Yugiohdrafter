import '../styles/boostrap.min.css';
import '../styles/globals.css'
import '../styles/vendorStyles.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../data/reducers';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
