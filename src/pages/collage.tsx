import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
import { ParsedUrlQuery } from 'querystring';
import cx from 'classnames';
/** Components */
import Canvas from '@components/Canvas';
/** Constants */
import { sessionOptions } from '@constants/session';
import { CANVAS_ITEM_SIZE, CANVAS_IMAGE_QUALITIES } from '@constants/canvas';
/** Utils */
import {
  loadImage,
  getImageFromCanvas,
  resizeBase64Img,
  shuffleArray,
} from '@utils/common';
/** Types */
import { User } from '@customTypes/auth';
import { Album } from '@customTypes/album';
import { CollageFilters, CollageImageBuffers } from '@customTypes/collage';
/** Styles */
import styles from '@styles/pages/Collage.module.scss';
import Spinner from '@components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/Button';

interface CollagePageProps {
  user: User | null;
  sessionKey: string | undefined;
  filters: CollageFilters;
}

const Collage: NextPage<CollagePageProps> = ({ user, sessionKey, filters }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [base64Canvas, setBase64Canvas] = useState<string>('');
  const [imageBuffers, setImageBuffers] = useState<CollageImageBuffers>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const collageSubHeaderClasses = cx(styles.collageSubHeader, {
    [styles.collageSubHeaderWithButton]: !!filters.shuffle,
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
  }, [filters]);

  useEffect(() => {
    handleDraw();
  }, [albums]);

  const handleDraw = useCallback(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');

    const imgPromises = albums.map(({ image: imageURL }, index) =>
      loadImage(imageURL).then((image) => {
        const width = parseInt(filters?.width ?? '0', 10);
        const column = index % width;
        const row = width ? Math.floor(index / width) : 0;

        context?.drawImage(
          image,
          column * CANVAS_ITEM_SIZE,
          row * CANVAS_ITEM_SIZE
        );
      })
    );

    Promise.allSettled(imgPromises).then(() => {
      setBase64Canvas(getImageFromCanvas(canvasRef.current, 1) ?? '');
    });
  }, [albums, filters]);

  useEffect(() => {
    const tempImageBuffers: CollageImageBuffers = {};
    const { width, height } = dimensions;

    const imageResizePromises = CANVAS_IMAGE_QUALITIES.map(([key, value]) =>
      resizeBase64Img(base64Canvas, width * value, height * value).then(
        (resizedImg: string) => {
          tempImageBuffers[key] = resizedImg;
        }
      )
    );

    Promise.allSettled(imageResizePromises).then(() => {
      setImageBuffers(tempImageBuffers);
    });
  }, [base64Canvas, dimensions]);

  const handleDownload = useCallback(
    (quality: string) => {
      const link = document.createElement('a');
      link.href = imageBuffers[quality];
      link.download = `collage_${quality}.png`;
      link.click();
    },
    [imageBuffers]
  );

  const handleShuffle = useCallback(() => {
    setAlbums(shuffleArray(albums));
  }, [albums]);

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
            <div className={collageSubHeaderClasses}>
              {filters.shuffle && (
                <Button onClick={() => handleShuffle()}>Shuffle</Button>
              )}

              <div className={styles.collageLinks}>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload('low')}
                >
                  <span>Low</span>
                  <FontAwesomeIcon
                    icon="download"
                    className={styles.collageLinkIcon}
                  />
                </button>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload('medium')}
                >
                  <span>Medium</span>
                  <FontAwesomeIcon
                    icon="download"
                    className={styles.collageLinkIcon}
                  />
                </button>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload('high')}
                >
                  <span>High</span>
                  <FontAwesomeIcon
                    icon="download"
                    className={styles.collageLinkIcon}
                  />
                </button>
              </div>
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
