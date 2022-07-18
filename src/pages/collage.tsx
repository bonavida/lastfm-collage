import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [base64Canvas, setBase64Canvas] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

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
  }, [filters]);

  const handleDraw = useCallback(() => {
    if (!canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    let x = 0;
    let y = 0;
    let loadedImages = 0;

    albums.forEach(({ image }) => {
      const myImage = new Image();
      myImage.crossOrigin = '*';
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
  }, [albums, dimensions]);

  const handleDownload = useCallback(
    (quality: number, partialText: string) => {
      resizeBase64Img(
        base64Canvas,
        dimensions.width * quality,
        dimensions.height * quality
      ).then((resizedImg: string) => {
        const link = document.createElement('a');
        link.href = resizedImg;
        link.download = `collage_${partialText}.png`;
        link.click();
      });
    },
    [base64Canvas, dimensions]
  );

  const handleShuffle = useCallback(() => {
    const { pathname, search } = window.location;
    router.push(`${pathname}${search}`, undefined, { shallow: false });
  }, [router]);

  useEffect(() => {
    imagesLoaded &&
      setBase64Canvas(getImageFromCanvas(canvasRef.current, 1) ?? '');
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
            <div className={styles.collageSubHeader}>
              <Button onClick={() => handleShuffle()}>Shuffle</Button>

              <div className={styles.collageLinks}>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload(0.25, 'low')}
                >
                  <span>Low</span>
                  <FontAwesomeIcon
                    icon="download"
                    className={styles.collageLinkIcon}
                  />
                </button>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload(0.5, 'medium')}
                >
                  <span>Medium</span>
                  <FontAwesomeIcon
                    icon="download"
                    className={styles.collageLinkIcon}
                  />
                </button>
                <button
                  className={styles.collageLink}
                  onClick={() => handleDownload(1, 'high')}
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
