import type { NextPage } from 'next';
import Head from 'next/head';

const PageNotFound: NextPage = () => {
  const loginHandler = () => {
    console.log('login');
  };

  return (
    <>
      <Head>
        <title>404 | Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application built with Next.js that creates a
              collage with the cover art of your favourite music registered
              in your last.fm account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>404</h1>
        <section>
          <p>This page could not be found.</p>
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

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-contents: center;
        }

        p {
          margin: 2rem 0;
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default PageNotFound;
