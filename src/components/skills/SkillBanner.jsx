import React from 'react';
import styles from './SkillBanner.module.css';

/**
 * SkillBanner — A single fishtail-shaped skill flag.
 *
 * @param {string}  title      - Display name of the skill
 * @param {string}  iconSrc    - Path to the SVG icon asset
 * @param {string}  baseColor  - Solid fill color for the banner body
 * @param {string}  [ariaLabel] - Optional explicit accessible label
 */
const SkillBanner = React.memo(function SkillBanner({ title, iconSrc, baseColor, ariaLabel, invertIcon }) {
  const iconClass = [styles.iconImg, invertIcon ? styles.iconImgInvert : '']
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={styles.bannerWrapper}
      aria-label={ariaLabel ?? `${title} skill`}
    >
      <div
        className={styles.banner}
        style={{ backgroundColor: baseColor }}
        role="img"
        aria-hidden="true"
      >
        {/* Subtle canvas weave texture overlay */}
        <div className={styles.texture} aria-hidden="true" />

        {/* Dashed stitching border that follows the V-cut */}
        <div className={styles.stitching} aria-hidden="true" />

        {/* Icon + label */}
        <div className={styles.bannerContent}>
          <span className={styles.bannerIcon}>
            <img
              src={iconSrc}
              alt=""
              width={44}
              height={44}
              className={iconClass}
              loading="lazy"
              decoding="async"
            />
          </span>
          <h3 className={styles.bannerTitle}>{title}</h3>
        </div>
      </div>
    </article>
  );
});

export default SkillBanner;
