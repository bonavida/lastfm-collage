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
  const { user } = pageProps;
  return (
    <Layout user={user}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
