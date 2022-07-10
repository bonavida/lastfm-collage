import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage, GetServerSideProps } from 'next';
/** Components */
import Button from '@components/Button';
/** Services */
import { signIn } from '@services/auth';
/** Constants */
import { sessionOptions } from '@constants/session';

const SignIn: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router?.isReady || !router?.query?.token) return;
    router.replace('/signin', undefined, { shallow: true });
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Sign In | Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application that creates a
              collage with the cover art of your favourite music registered
              in your last.fm account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Welcome to <b>Last.fm Collage</b>
        </h1>
        <section>
          <p>
            <strong>Last.fm Collage</strong> is an application that creates a
            collage with the cover art of your favourite music registered in
            your last.fm account.
          </p>
          <Button onClick={() => signIn()}>Login to Last.fm</Button>
        </section>
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

        h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        h1 b {
          color: #e31b23;
        }

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-contents: center;
          max-width: 900px;
        }

        p {
          margin: 4rem 0;
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
        }

        button {
          border-radius: 500px;
          font-size: 14px;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          will-change: transform;
          padding: 8px 24px;
          transition: transform 0.1s ease-in;
          transform: perspective(1px) scale(1) translateZ(0);
        }

        button:hover {
          transform: perspective(1px) scale(1.01) translateZ(0);
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query = {} }) => {
    const { token } = query;
    const { user: sessionUser } = req.session;
    console.log(sessionUser);
    console.log(token);
    // If user is stored in session, return it in the props
    if (sessionUser) return { props: { user: sessionUser } };
    // If there's no token in the URL, return empty props
    if (!token) return { props: {} };
    // If there's a token in the URL, fetch the session and the user
    // in order to save it in the session.
    const response = await fetch(
      `${process.env.API_URL}/api/me?token=${token}`,
      {
        method: 'GET',
      }
    );
    const { user } = await response.json();
    return {
      props: { user },
    };
  },
  sessionOptions
);

export default SignIn;
