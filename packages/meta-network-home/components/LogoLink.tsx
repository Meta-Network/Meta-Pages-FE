import React from 'react';
import styles from './LogoLink.module.css';

export default ({
  src,
  href,
  alt,
}: {
  src: string;
  href: string;
  alt: string;
}) => {
  return (
    <a href={href} target="__blank">
      <img className={styles.logoLink} src={src} alt={alt} />
    </a>
  );
};
