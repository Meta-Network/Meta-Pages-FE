import React from 'react';
import styles from './Footer.module.css';
import LogoLink from './LogoLink';

export default () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContacts}>
        <LogoLink
          href="https://t.me/metanetwork"
          src="/images/logos/telegram.svg"
          alt="Telegram"
        />
        <LogoLink
          href="https://twitter.com/realMetaNetwork"
          src="/images/logos/twitter.png"
          alt="Twitter"
        />
        <LogoLink
          href="https://matrix.to/#/!jrjmzTFiYYIuKnRpEg:matrix.org?via=matrix.org"
          src="/images/logos/element.svg"
          alt="Element"
        />
      </div>
      <div className={styles.footerBrands}>
        <img
          className={styles.brandLogo}
          src="/images/logos/QTUM.png"
          alt="QTUM"
        />
        <img className={styles.brandLogo} src="/images/logos/LD.png" alt="LD" />
        <img
          className={styles.brandLogo}
          src="/images/logos/dForce.png"
          alt="dForce"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/MCDEX.png"
          alt="MCDEX"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/YFII.png"
          alt="YFII"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/NGC.png"
          alt="NGC"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/Primitive.png"
          alt="Primitive"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/Cyberright.png"
          alt="Cyberright"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/499Block.png"
          alt="499Block"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/OGlabs.png"
          alt="OGlabs"
        />
        <img
          className={styles.brandLogo}
          src="/images/logos/ybb.png"
          alt="ybb"
        />
      </div>
    </footer>
  );
};
