import React from 'react';
import styles from './ButtonToIndex.module.css';

export default () => {
  return (
    <span>
      <a
        style={{ verticalAlign: 'sub' }}
        href="https://www.metanetwork.online/"
        target="__blank"
      >
        <button className={styles.buttonToIndex}>
          <span>抢先占领</span>
        </button>
      </a>
      <a
        style={{
          textDecoration: 'none',
        }}
        href={process.env.NEXT_PUBLIC_VIDEO_RECORD_URL}
        target="__blank"
      >
        <span className={styles.linkToVideo}>发布会视频 {'>'}</span>
      </a>
    </span>
  );
};
