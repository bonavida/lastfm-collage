import { useEffect, useState, useMemo, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
import { ParsedUrlQuery } from 'querystring';
import cx from 'classnames';
/** Components */
import Canvas from '@components/Canvas';
/** Constants */
import { sessionOptions } from '@constants/session';
import { CANVAS_ITEM_SIZE } from '@constants/canvas';
/** Utils */
import { getImageFromCanvas, resizeBase64Img } from '@utils/common';
/** Types */
import { User } from '@customTypes/auth';
import { Album } from '@customTypes/album';
import { CollageFilters } from '@customTypes/collage';
/** Styles */
import styles from '@styles/pages/Collage.module.scss';
import Spinner from '@components/Spinner';

interface CollagePageProps {
  user: User | null;
  sessionKey: string | undefined;
  filters: CollageFilters;
}

const Collage: NextPage<CollagePageProps> = ({ user, sessionKey, filters }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lowRef = useRef<HTMLAnchorElement>(null);
  const mediumRef = useRef<HTMLAnchorElement>(null);
  const highRef = useRef<HTMLAnchorElement>(null);

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

  const collageContainerClasses = cx(styles.container, {
    [styles.containerLoading]: loading,
  });

  useEffect(() => {
    const getTopAlbums = async () => {
      setLoading(true);

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
        setAlbums(albums);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    getTopAlbums();
  }, []);

  const handleDraw = () => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    let x = 0;
    let y = 0;
    let loadedImages = 0;

    albums.forEach(({ image }) => {
      const myImage = new Image();
      myImage.crossOrigin = 'anonymous';
      myImage.onload = () => {
        context?.drawImage(myImage, x, y);
        x += CANVAS_ITEM_SIZE;
        if (x >= dimensions.width) {
          x = 0;
          y += CANVAS_ITEM_SIZE;
        }
        if (++loadedImages === albums.length) {
          setImagesLoaded(true);
        }
      };
      myImage.src = image;
    });
  };

  useEffect(() => {
    if (imagesLoaded) {
      const base64OriginalCanvas =
        getImageFromCanvas(canvasRef.current, 1) ?? '';

      // High res
      highRef.current?.setAttribute('href', base64OriginalCanvas);

      // Medium res
      resizeBase64Img(
        base64OriginalCanvas,
        dimensions.width / 2,
        dimensions.height / 2
      ).then((resizedImg: string) => {
        mediumRef.current?.setAttribute('href', resizedImg);
      });

      // Low res
      resizeBase64Img(
        base64OriginalCanvas,
        dimensions.width / 4,
        dimensions.height / 4
      ).then((resizedImg: string) => {
        lowRef.current?.setAttribute('href', resizedImg);
      });
    }
  }, [imagesLoaded]);

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
      <div className={collageContainerClasses}>
        {loading && <Spinner />}
        {!loading && hasAlbums && (
          <>
            <div className={styles.collageLinks}>
              <a
                ref={lowRef}
                className={styles.collageLink}
                href=""
                download="collage_low.png"
              >
                Low
              </a>
              <a
                ref={mediumRef}
                className={styles.collageLink}
                href=""
                download="collage_medium.png"
              >
                Medium
              </a>
              <a
                ref={highRef}
                className={styles.collageLink}
                href=""
                download="collage_high.png"
              >
                High
              </a>
            </div>
            <Canvas
              ref={canvasRef}
              dimensions={dimensions}
              className={styles.canvas}
              onDraw={handleDraw}
            />
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({
    req,
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
