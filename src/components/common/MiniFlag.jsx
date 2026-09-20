/**
 * MiniFlag — Reusable fishtail-shaped tech-stack flag.
 *
 * Props
 * ─────
 * skillMeta  {object|null}  — { iconSrc, color, invertIcon } from skillsMap lookup.
 *                             Pass null to render a React-icon chip fallback.
 * label      {string}       — Skill name shown below the flag (and as aria-label).
 */
import React from 'react';
import {
  SiPython, SiFlask, SiGit, SiMongodb, SiTailwindcss,
  SiReact, SiNodedotjs, SiExpress, SiJavascript, SiTypescript,
  SiHtml5, SiPostgresql, SiMysql, SiDocker,
  SiFirebase, SiVercel, SiNetlify, SiGithub, SiFigma,
  SiJest, SiVite, SiNextdotjs, SiRedux, SiGraphql,
  SiRust, SiGo, SiKubernetes 
} from 'react-icons/si';
import { FaAws } from "react-icons/fa";
import { BiLogoCss3 } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";


import {
  VscCode,
  VscCloud,
} from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';
import { BiBrain } from 'react-icons/bi';
import styles from './MiniFlag.module.css';

/* ── React-icon fallback map (normalised key → { Icon, color }) ──────── */
const ICON_MAP = {
  python:          { Icon: SiPython,         color: '#3776AB' },
  flask:           { Icon: SiFlask,          color: '#000000' },
  git:             { Icon: SiGit,            color: '#ffffff' },
  github:          { Icon: SiGithub,         color: '#181717' },
  mongodb:         { Icon: SiMongodb,        color: '#47A248' },
  tailwindcss:     { Icon: SiTailwindcss,    color: '#06B6D4' },
  react:           { Icon: SiReact,          color: '#61DAFB' },
  nodejs:          { Icon: SiNodedotjs,      color: '#339933' },
  express:         { Icon: SiExpress,        color: '#000000' },
  javascript:      { Icon: SiJavascript,     color: '#F7DF1E' },
  typescript:      { Icon: SiTypescript,     color: '#3178C6' },
  html5:           { Icon: SiHtml5,          color: '#E34F26' },
  css3:            { Icon: BiLogoCss3,           color: '#1572B6' },
  postgresql:      { Icon: SiPostgresql,     color: '#4169E1' },
  mysql:           { Icon: SiMysql,          color: '#4479A1' },
  docker:          { Icon: SiDocker,         color: '#2496ED' },
  firebase:        { Icon: SiFirebase,       color: '#FFCA28' },
  vercel:          { Icon: SiVercel,         color: '#000000' },
  netlify:         { Icon: SiNetlify,        color: '#00C7B7' },
  figma:           { Icon: SiFigma,          color: '#F24E1E' },
  jest:            { Icon: SiJest,           color: '#C21325' },
  vite:            { Icon: SiVite,           color: '#646CFF' },
  nextjs:          { Icon: SiNextdotjs,      color: '#000000' },
  redux:           { Icon: SiRedux,          color: '#764ABC' },
  graphql:         { Icon: SiGraphql,        color: '#E10098' },
  rust:            { Icon: SiRust,           color: '#CE412B' },
  go:              { Icon: SiGo,             color: '#00ADD8' },
  kubernetes:      { Icon: SiKubernetes,     color: '#326CE5' },
  aws:             { Icon:FaAws , color: '#FF9900' },
  restapi:         { Icon: TbApi,            color: '#6366F1' },
  'restapis':      { Icon: TbApi,            color: '#6366F1' },
  llm:             { Icon: BiBrain,          color: '#8B5CF6' },
  cloud:           { Icon: VscCloud,         color: '#0ea5e9' },
};

/* normalise a skill label to a lookup key */
function toKey(label) {
  return label.toLowerCase().replace(/[\s./\-]/g, '');
}

/* ── Component ──────────────────────────────────────────────────────────── */
function MiniFlag({ skillMeta, label }) {
  /* ── Case 1: explicit iconSrc provided via skillsMap ── */
  if (skillMeta) {
    const iconClass = [
      styles.flagIcon,
      skillMeta.invertIcon ? styles.flagIconInvert : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.flag} aria-label={label} title={label}>
        <div className={styles.flagBody} style={{ backgroundColor: skillMeta.color }}>
          <div className={styles.flagTexture} aria-hidden="true" />
          <div className={styles.flagStitch} aria-hidden="true" />
          <img
            src={skillMeta.iconSrc}
            alt=""
            className={iconClass}
            loading="lazy"
            decoding="async"
          />
        </div>
        <span className={styles.flagName}>{label}</span>
      </div>
    );
  }

  /* ── Case 2: no iconSrc — try react-icons fallback ── */
  const entry = ICON_MAP[toKey(label)];
  if (entry) {
    const { Icon, color } = entry;
    const isDark = color === '#000000' || color === '#181717';
    return (
      <div className={styles.flag} aria-label={label} title={label}>
        <div className={styles.flagBody} style={{ backgroundColor: color }}>
          <div className={styles.flagTexture} aria-hidden="true" />
          <div className={styles.flagStitch} aria-hidden="true" />
          <Icon
            size={26}
            color={isDark ? '#ffffff' : '#fff'}
            style={{ position: 'relative', zIndex: 1, marginTop: '-10px', flexShrink: 0 }}
            aria-hidden="true"
          />
        </div>
        <span className={styles.flagName}>{label}</span>
      </div>
    );
  }

  /* ── Case 3: totally unknown — generic chip ── */
  return (
    <div className={styles.flag} aria-label={label} title={label}>
      <div className={styles.flagBody} style={{ backgroundColor: '#64748b' }}>
        <div className={styles.flagTexture} aria-hidden="true" />
        <div className={styles.flagStitch} aria-hidden="true" />
        <VscCode
          size={22}
          color="#fff"
          style={{ position: 'relative', zIndex: 1, marginTop: '-10px' }}
          aria-hidden="true"
        />
      </div>
      <span className={styles.flagName}>{label}</span>
    </div>
  );
}

export default React.memo(MiniFlag);
