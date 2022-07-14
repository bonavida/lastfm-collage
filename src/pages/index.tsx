import { useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
/** Services */
import { getUserTopAlbums } from '@services/lastfm';
/** Constants */
import { sessionOptions } from '@constants/session';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from '@styles/pages/Home.module.scss';

interface IndexPageProps {
  user: User | null;
  sessionKey: string | undefined;
}

const Home: NextPage<IndexPageProps> = ({ user, sessionKey }) => {
  useEffect(() => {
    const getTopAlbums = async () => {
      try {
        const albums = await getUserTopAlbums(
          user?.username ?? '',
          sessionKey ?? '',
          { period: 'overall', limit: 150 }
        );
        console.log(albums);
      } catch (e) {
        console.error(e);
      }
    };

    getTopAlbums();
  }, []);

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
  async ({
    req,
    res,
  }): Promise<{
    props: { user: User | null; sessionKey?: string | undefined };
  }> => {
    const { user, sessionKey } = req.session ?? {};
    if (!user) {
      res.statusCode = 302;
      res.setHeader('Location', '/signin');
      res.end();
      return { props: { user: null } };
    }
    return { props: { user, sessionKey } };
  },
  sessionOptions
);

export default Home;
