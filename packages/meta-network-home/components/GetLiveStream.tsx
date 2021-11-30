import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
import styles from './GetLiveStream.module.css';

const liveUrl = `https://${process.env.NEXT_PUBLIC_LIVE_HLS_DOMAIN}/live/${process.env.NEXT_PUBLIC_LIVE_HLS_SECRETS}/index.m3u8`;

export default () => {
  const playerRef = useRef();
  const [isHLSActive, setIsHLSActive] = useState(false);

  async function checkHLSActive(url) {
    try {
      const res = await axios.head(url);
      return /2\d\d/.test(res.status.toString());
    } catch (err) {
      console.log(`No streaming is available. Message: ${err}`);
      return false;
    }
  }

  useEffect(() => {
    checkHLSActive(liveUrl).then((result) => {
      setIsHLSActive(result);
    });
  }, []);

  if (isHLSActive) {
    return (
      <ReactHlsPlayer
        playerRef={playerRef}
        src={liveUrl}
        className={styles.contentCardElement}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
    );
  }

  if (process.env.NEXT_PUBLIC_CLOUD_FLARE_LIVE_ID) {
    return (
      <iframe
        src={`https://iframe.videodelivery.net/${process.env.NEXT_PUBLIC_CLOUD_FLARE_LIVE_ID}`}
        className={styles.contentCardElement}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
        id="stream-player"
      />
    );
  }

  return (
    <img
      className={styles.contentCardElement}
      src="/images/card.png"
      alt="banner card"
    />
  );
};
