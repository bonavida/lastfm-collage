import { useEffect, useState, useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
/** Components */
import Canvas from '@components/Canvas';
/** Services */
import { getUserTopAlbums } from '@services/lastfm';
/** Constants */
import { sessionOptions } from '@constants/session';
import { CANVAS_ITEM_SIZE } from '@constants/canvas';
/** Types */
import { User } from '@customTypes/auth';
import { Album } from '@customTypes/album';
import { CanvasDimensions } from '@customTypes/canvas';
/** Styles */
import styles from '@styles/pages/Home.module.scss';

interface IndexPageProps {
  user: User | null;
  sessionKey: string | undefined;
}

const Home: NextPage<IndexPageProps> = ({ user, sessionKey }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [dimensions, setDimensions] = useState<CanvasDimensions>({
    width: 0,
    height: 0,
  });
  const hasAlbums = useMemo(() => albums.length > 0, [albums]);

  useEffect(() => {
    const getTopAlbums = async () => {
      try {
        const response = await fetch('/api/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user?.username ?? '',
            sessionKey: sessionKey ?? '',
            filters: { period: 'overall', limit: 150 },
          }),
        });
        const { albums }: { albums: Album[] } = await response.json();
        console.log(albums);
        setAlbums(albums);
        setDimensions({
          width: 10 * CANVAS_ITEM_SIZE,
          height: 15 * CANVAS_ITEM_SIZE,
        });
      } catch (e) {
        console.error(e);
      }
    };

    getTopAlbums();
  }, []);

  const handleDraw = (context: CanvasRenderingContext2D | null) => {
    if (!context) return;

    let x = 0;
    let y = 0;

    albums.forEach(({ image }) => {
      const myImage = new Image();
      myImage.onload = () => {
        context.drawImage(myImage, x, y);
        x += CANVAS_ITEM_SIZE;
        if (x >= dimensions.width) {
          x = 0;
          y += CANVAS_ITEM_SIZE;
        }
      };
      myImage.src = image;
    });
  };

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
        {hasAlbums && (
          <Canvas
            dimensions={dimensions}
            className={styles.canvas}
            onDraw={handleDraw}
          />
        )}
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
