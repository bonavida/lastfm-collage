import { useEffect, useState, useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
import { ParsedUrlQuery } from 'querystring';
/** Components */
import Canvas from '@components/Canvas';
/** Constants */
import { sessionOptions } from '@constants/session';
import { CANVAS_ITEM_SIZE } from '@constants/canvas';
/** Types */
import { User } from '@customTypes/auth';
import { Album } from '@customTypes/album';
/** Styles */
import styles from '@styles/pages/Home.module.scss';
import { CollageFilters } from '@customTypes/collage';

interface CollagePageProps {
  user: User | null;
  sessionKey: string | undefined;
  filters: CollageFilters;
}

const Collage: NextPage<CollagePageProps> = ({ user, sessionKey, filters }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const hasAlbums = useMemo(() => albums.length > 0, [albums]);
  const dimensions = useMemo(
    () => ({
      width: parseInt(filters?.width ?? '0', 10) * CANVAS_ITEM_SIZE,
      height: parseInt(filters?.height ?? '0', 10) * CANVAS_ITEM_SIZE,
    }),
    [filters]
  );
  const limit = useMemo(
    () =>
      parseInt(filters?.width ?? '0', 10) *
      parseInt(filters?.height ?? '0', 10),
    [filters]
  );

  useEffect(() => {
    const getTopAlbums = async () => {
      try {
        const { username, ...restFilters } = filters;
        const response = await fetch('/api/albums', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username ?? user?.username ?? '',
            sessionKey: sessionKey ?? '',
            filters: { ...restFilters, limit },
          }),
        });
        const { albums }: { albums: Album[] } = await response.json();
        console.log(albums);
        setAlbums(albums);
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
        <title>Your Collage | Last.fm Collage</title>
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
    query,
  }): Promise<{
    redirect?: {
      permanent?: boolean;
      destination: string;
    };
    props: {
      user: User | null;
      sessionKey?: string | undefined;
      filters?: ParsedUrlQuery;
    };
  }> => {
    const { user, sessionKey } = req.session ?? {};
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/signin',
        },
        props: { user: null },
      };
    }
    return { props: { user, sessionKey, filters: query } };
  },
  sessionOptions
);

export default Collage;
