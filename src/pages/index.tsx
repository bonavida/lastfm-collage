import { useEffect, useState, useMemo } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
/** Components */
import Select from '@components/Select';
import Input from '@components/Input';
import Switch from '@components/Switch';
import Canvas from '@components/Canvas';
/** Constants */
import { sessionOptions } from '@constants/session';
import { CANVAS_ITEM_SIZE } from '@constants/canvas';
import { LASTFM_METHODS, LASTFM_PERIODS } from '@constants/lastfm';
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

    // getTopAlbums();
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

  const handleSelectChange = () => {};

  const handleInputChange = () => {};

  const handleSwitchChange = () => {};

  return (
    <>
      <Head>
        <title>Configuration | Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application that creates a collage with the cover art of your favourite music registered in your last.fm account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Configuration</h1>
        <form>
          <div className={styles.formGroupSingle}>
            <div className={styles.formField}>
              <h3 className={styles.formFieldTitle}>Collage type</h3>
              <Select
                name="collage_type"
                options={LASTFM_METHODS}
                value="user.gettopalbums"
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formFieldWrapper}>
              <h3 className={styles.formFieldTitle}>Dimensions</h3>
              <div className={styles.formFieldHorizontal}>
                <span className={styles.formFieldLabel}>Width</span>
                <Input
                  name="width"
                  type="number"
                  min="0"
                  placeholder="Set a width"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formFieldHorizontal}>
                <span className={styles.formFieldLabel}>Height</span>
                <Input
                  name="height"
                  type="number"
                  min="0"
                  placeholder="Set a height"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.formFieldWrapper}>
              <h3 className={styles.formFieldTitle}>Period</h3>
              <Select
                name="period"
                options={LASTFM_PERIODS}
                value="overall"
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div className={styles.formField}>
            <Switch name="shuffle" value={true} onChange={handleSwitchChange}>
              Shuffle
            </Switch>
          </div>
          <div className={styles.formFieldWrapper}>
            <div className={styles.formField}>
              <Switch
                name="other_user"
                value={false}
                onChange={handleSwitchChange}
              >
                From another user?
              </Switch>
            </div>
            <div className={styles.formGroupSingle}>
              <div className={styles.formField}>
                <Input
                  name="username"
                  placeholder="Set a username"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
        {hasAlbums && (
          <Canvas
            dimensions={dimensions}
            className={styles.canvas}
            onDraw={handleDraw}
          />
        )}
      </div>
      <style jsx>
        {`
          h1 {
            color: #333;
            margin: 0;
          }
          form {
            width: 100%;
            max-width: 700px;
            display: flex;
            flex-direction: column;
            row-gap: 30px;
          }
        `}
      </style>
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
