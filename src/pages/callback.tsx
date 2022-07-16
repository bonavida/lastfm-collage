import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
/** Context */
import { useToast } from 'context/useToast';
/** Components */
import Spinner from '@components/Spinner';

const CallbackPage: NextPage = () => {
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    if (!router?.isReady || !router?.query?.token) return;

    const getMe = async (token: string) => {
      try {
        await fetch(`/api/me?token=${token}`, {
          method: 'GET',
        });
        addToast({
          message: 'You are successfully logged in',
          status: 'success',
          duration: 4000,
        });
        router.push('/');
      } catch (e) {
        console.error(e);
        addToast({
          message: 'Oops, something went wrong',
          status: 'error',
          isStatic: true,
        });
        router.push('/signin');
      }
    };

    getMe(router.query.token as string);
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application that creates a
              collage with the cover art of your favourite music registered
              in your last.fm account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Spinner />
      </main>
      <style jsx>{`
        main {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default CallbackPage;
