import type { AppProps } from 'next/app';
/** Components */
import Layout from '@components/Layout';
/** Utils and constants */
import { registerIcons } from '@utils/fontAwesome';
/** Styles */
import '@styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

registerIcons();

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
