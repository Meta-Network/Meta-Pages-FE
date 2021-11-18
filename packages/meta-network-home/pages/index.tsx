// noinspection CssUnknownTarget,HtmlUnknownTarget

import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHLS from 'react-hls';
import Footer from '../components/Footer';
import ButtonToIndex from '../components/ButtonToIndex';

const liveUrl = `https://${process.env.NEXT_PUBLIC_LIVE_HLS_DOMAIN}/live/${process.env.NEXT_PUBLIC_LIVE_HLS_SECRETS}/index.m3u8`;

export default function Home() {
  const [isHLSActive, setIsHLSActive] = useState(false);

  async function checkHLSActive(url) {
    try {
      const res = await axios.head(url);
      return /2\d\d/.test(res.status.toString());
    } catch (err) {
      console.log('err', url, err);
      return false;
    }
  }

  useEffect(() => {
    checkHLSActive(liveUrl).then((result) => {
      setIsHLSActive(result);
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Meta Network</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preload" href="/images/background.png" as="image" />
        <link rel="preload" href="/images/card.png" as="image" />
      </Head>

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
            <p>
              <span>2021·11·22 ｜19:00～21:30 (GMT+8)</span>
            </p>
            <p>
              <span
                style={{
                  verticalAlign: 'middle',
                }}
              >
                正式发布
              </span>
              <ButtonToIndex />
            </p>
            <p className="description-extra">
              <a
                href="https://www.matataki.io/"
                target="__blank"
                style={{ paddingRight: 15 }}
              >
                <img
                  className="logo-link"
                  src="/images/logos/matataki.png"
                  alt="Matataki"
                />
              </a>
              <a href="https://www.meta.io/" target="__blank">
                <img
                  className="logo-link"
                  src="/images/logos/meta-io.png"
                  alt="Meta-io"
                />
              </a>
            </p>
          </div>
        </div>

        <div className="card second-card">
          {isHLSActive ? (
            <ReactHLS className="content-card-element" url={liveUrl} />
          ) : (
            <img className="content-card-element" src="/images/card.png" />
          )}
        </div>

        <Footer />
      </main>

      <style jsx>{`
        @font-face {
          font-family: Oriya MN;
          src: url('oriya-mn.ttf');
        }

        main {
          display: flex;
          justify-content: space-around;
          color: white;
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

        .content-card-element {
          width: 40vw;
          height: 22vw;
        }

        .content-card-container {
          box-sizing: border-box;
          display: inline-block;
          overflow: hidden;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
          max-width: 100%;
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

        .logo-link {
          width: 3vw;
          height: 3vw;
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

          .content-card-element {
            width: 80vw;
            height: 44vw;
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

          .logo-link {
            width: 7vw;
            height: 7vw;
          }

          .description-extra {
            margin-top: 2vw !important;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-size: cover;
          background-image: url('/images/background.png');
        }

        .hls-player {
          width: 40vw;
          height: 22vw;
        }

        @media only screen and (max-width: 600px) {
          .hls-player {
            width: 80vw;
            height: 44vw;
          }
        }

        p {
          padding: 0;
          margin: 0.5vw 0;
        }
      `}</style>
    </div>
  );
}
