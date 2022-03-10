// noinspection CssUnknownTarget,HtmlUnknownTarget

import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import LogoLink from '../components/LogoLink';
import ButtonToIndex from '../components/ButtonToIndex';
import GetLiveStream from '../components/GetLiveStream';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Meta Network</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preload" href="/images/background.png" as="image" />
        <link rel="preload" href="/images/card.png" as="image" />

        <script src="https://embed.videodelivery.net/embed/sdk.latest.js" />
      </Head>

      <header>
        <p>
          Real META Token from meta.io is:
          0x8807e69dC04155AF64172Cd6f0B4738F8068D0D4 (ETH)
        </p>
      </header>

      <main>
        <div className="card first-card">
          <h1 className="title">
            <img
              className="logo-before-title"
              src="/images/logos/meta-network.png"
              alt="Meta Network Logo"
            />
            <span className="colored-title">META</span> NETWORK
          </h1>

          <div className="description">
            <p className="description-extra">
              <LogoLink
                href="https://www.matataki.io/"
                src="/images/logos/matataki.png"
                alt="Matataki"
              />
              <LogoLink
                href="https://www.meta.io/"
                src="/images/logos/meta-io.png"
                alt="meta.io"
              />
              <ButtonToIndex />
            </p>
          </div>
        </div>

        <div className="card second-card">
          <GetLiveStream />
        </div>

        <Footer />
      </main>

      <style jsx global>{`
        @font-face {
          font-family: Oriya MN;
          src: url('oriya-mn.ttf');
        }

        header {
          font-size: 1.1vw;
          left: 50%;
          top: 1vw;
          position: fixed;
          transform: translateX(-50%);
        }

        main {
          display: flex;
          justify-content: space-around;
          min-height: 100vh;
          align-items: center;
          flex-direction: row;
        }

        .card {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .title {
          font-family: Oriya MN, sans-serif;
          font-size: 3.3vw;
        }

        span.colored-title {
          color: rgb(218, 254, 96);
        }

        .logo-before-title {
          width: 3vw;
          height: 3.4vw;
          top: 0.5vw;
          right: 3.7vw;
          position: relative;
          margin-right: -3vw;
        }

        .first-card {
          margin-left: 10vw;
        }

        .second-card {
          margin-right: 10vw;
          position: relative;
          display: inline-block;
        }

        .description {
          display: flex;
          white-space: nowrap;
          flex-direction: column;
          font-family: Source Han Sans, Droid Sans, Helvetica Neue, sans-serif;
          font-size: 1.6vw;
          line-height: 2;
          justify-content: center;
        }

        .description-extra a {
          vertical-align: text-top;
        }

        .hls-player {
          width: 40vw;
          height: 22vw;
        }

        @media only screen and (max-width: 600px) {
          main {
            flex-direction: column;
            justify-content: space-between;
          }

          .title {
            font-size: 9vw;
          }

          .description {
            font-size: 4.5vw;
          }

          .first-card {
            margin-left: 10vw;
            margin-top: 10vw;
          }

          .second-card {
            display: flex;
            margin: 50px 0 0;
            justify-content: center;
            align-items: center;
          }

          .logo-before-title {
            width: 8vw;
            height: 8.2vw;
            top: 1vw;
            right: 10vw;
            position: relative;
            margin-right: -8vw;
          }

          p {
            margin: 1vw 0 !important;
          }

          .description-extra {
            margin-top: 2vw !important;
          }

          .hls-player {
            width: 80vw;
            height: 44vw;
          }
        }

        html,
        body {
          padding: 0;
          margin: 0;
          color: white;
          background-size: cover;
          background-image: url('/images/background.png');
        }

        p {
          padding: 0;
          margin: 0.5vw 0;
        }
      `}</style>
    </div>
  );
}
