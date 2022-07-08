import type { NextPage } from 'next';
import Head from 'next/head';
/** Components */
import Button from '@components/Button';

const SignIn: NextPage = () => {
  const signInHandler = () => {
    console.log('signin');
  };

  return (
    <>
      <Head>
        <title>Sign In | Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application built with Next.js that creates a
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
            Last.fm Collage is an application built with Next.js that creates a
            collage with the cover art of your favourite music registered in
            your last.fm account.
          </p>
          <Button onClick={signInHandler}>Login to Last.fm</Button>
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

export default SignIn;
