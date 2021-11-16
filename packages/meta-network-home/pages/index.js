// noinspection CssUnknownTarget,HtmlUnknownTarget

import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Meta Network</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/images/background.png" as="image" />
        <link rel="preload" href="/images/card.png" as="image" />
      </Head>

      <main>
        <card style={{marginLeft: '10vw'}}>
          <h1 className="title">
            <img
              className="logo-before-title"
              src="/images/logos/meta-network.png"
             alt="Meta Network Logo" />
            <span className="colored-title">META</span> NETWORK
          </h1>

          <div className="description">
            <p>
              <span>
                2021·11·22 ｜19:00～21:00 (GMT+8)
              </span>
            </p>
            <p>
              <span style={{
                verticalAlign: 'middle',
              }}>
                正式发布
              </span>
              <a href="https://www.metanetwork.online/" target="__blank">
                <button className="to-meta-network">
                  抢先占领
                </button>
              </a>
            </p>
            <p style={{ marginTop: 20 }}>
              <a href="https://www.matataki.io/" target="__blank" style={{ paddingRight: 15 }}>
                <img className="logo-link" src="/images/logos/matataki.png"  alt="Matataki"/>
              </a>
              <a href="https://www.meta.io/" target="__blank">
                <img className="logo-link" src="/images/logos/meta-io.png"  alt="Meta-io"/>
              </a>

            </p>
          </div>
        </card>

        <card className="rightCard">
          <Image
            priority
            width={850}
            height={470}
            src="/images/card.png"
          />
        </card>
      </main>

      <Footer />

      <style jsx>{`
        @font-face {
          font-family: Oriya MN; src: url('oriya-mn.ttf');
        }
        .container {
          color: white;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        
        main {
          display: flex;
          justify-content: space-around;
        }

        card {
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
        
        .rightCard {
          margin-right: 10vw;
          position: relative;
          display: inline-block;
        }

        .description {
          display: flex;
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
        
        .to-meta-network {
          margin-left: 2vw;
          vertical-align: middle;
          min-width: 9vw;
          min-height: 2.8vw;
          font-size: 1vw;
          color: black;
          padding: 5px 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          outline: none;
          overflow: hidden;
          border-radius: 5px;
          border: none;
          background-color: rgb(218, 254, 96);
        }
        .to-meta-network:hover {
          border-radius: 5px;
          padding-right: 24px;
          padding-left:8px;
        }
        .to-meta-network:hover:after {
          opacity: 1;
          right: 10px;
        }
        .to-meta-network:after {
          content: '»';
          position: absolute;
          opacity: 0;
          font-size: 20px;
          line-height: 40px;
          top: 0;
          right: -20px;
          transition: 0.4s;
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
        
        p {
          padding: 0;
          margin: 8px 0;
        }
      `}</style>
    </div>
  )
}
