import { useEffect, useCallback } from 'react';
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
/** Types */
import { User } from '@customTypes/auth';
/** Utils */
import { retrieveLastfmToken } from '@utils/common';

interface SignInPageProps {
  user: User | null;
}

const SignIn: NextPage<SignInPageProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const getMe = async (token: string) => {
        try {
          await fetch(`/api/me?token=${token}`, {
            method: 'GET',
          });
          router.push('/');
        } catch (e) {
          console.error(e);
        }
      };

      if (window.location.search) {
        const token = retrieveLastfmToken(window.location.search);
        token && getMe(token);
      }
    }
  }, []);

  const handleLogout = useCallback(() => {
    const logout = async () => {
      try {
        await fetch('/api/logout', {
          method: 'GET',
        });
        router.replace('/signin');
      } catch (e) {
        console.error(e);
      }
    };
    logout();
  }, [router]);

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
          {user ? (
            <Button isSecondary onClick={() => handleLogout()}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => signIn()}>Login to Last.fm</Button>
          )}
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
  async ({ req }) => {
    const { user = null } = req.session ?? {};
    return { props: { user } };
  },
  sessionOptions
);

export default SignIn;
