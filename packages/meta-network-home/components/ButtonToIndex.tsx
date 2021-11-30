import React from 'react';
import styles from './ButtonToIndex.module.css';

export default () => {
  return (
    <a
      style={{ verticalAlign: 'sub' }}
      href="https://www.metanetwork.online/"
      target="__blank"
    >
      <button className={styles.buttonToIndex}>
        <span>抢先占领</span>
      </button>
    </a>
  );
};
