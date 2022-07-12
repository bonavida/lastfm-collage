import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
/** Constants */
import { sessionOptions } from '@constants/session';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from '@styles/pages/Home.module.scss';

interface IndexPageProps {
  user: User | null;
}

const Home: NextPage<IndexPageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application that creates a collage with the cover art of your favourite music registered in your last.fm account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {user && <span>{user.username}</span>}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }): Promise<{ props: { user: User | null } }> => {
    const { user } = req.session ?? {};
    if (!user) {
      res.statusCode = 302;
      res.setHeader('Location', '/signin');
      res.end();
      return { props: { user: null } };
    }
    return { props: { user } };
  },
  sessionOptions
);

export default Home;
