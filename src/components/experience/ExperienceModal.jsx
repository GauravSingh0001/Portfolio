/**
 * ExperienceModal — Two-column overlay for internship/experience details.
 *
 * LEFT  : small company banner · period pill · role info ·
 *         fishtail tech-stack flags · View Certificate button ·
 *         WHAT / HOW / WHY anchor nav (headings live here)
 * RIGHT : scrollable blog-style body text only (no headings)
 *
 * Props
 * ─────
 * item      {object} — the active experience item (see Experience.jsx for shape)
 * onClose   {func}   — callback to dismiss the modal
 * skillsMap {object} — id→{iconSrc, color, invertIcon} lookup
 */
import React, { useEffect, useCallback } from 'react';
import styles from './ExperienceModal.module.css';
import MiniFlag from '../common/MiniFlag';

const SECTIONS = [
  { id: 'em-what', label: 'WHAT', key: 'what' },
  { id: 'em-how',  label: 'HOW',  key: 'how'  },
  { id: 'em-why',  label: 'WHY',  key: 'why'  },
];

function ExperienceModal({ item, onClose, skillsMap = {} }) {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!item) return null;

  const activeSections = SECTIONS.filter(({ key }) => Boolean(item[key]));

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="em-title"
    >
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>

        {/* ── Close ── */}
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Two-column split ── */}
        <div className={styles.split}>

          {/* ───── LEFT PANEL ───── */}
          <div className={styles.left}>

            {/* Small banner — no blur */}
            <div className={styles.thumb}>
              <img
                src={item.image}
                alt={item.label || 'Experience'}
                className={styles.thumbImg}
              />
              {item.period && (
                <span className={styles.period}>{item.period}</span>
              )}
            </div>

            {/* Company info */}
            <div className={styles.info}>
              <span className={styles.eyebrow}>// Internship</span>
              <h3 id="em-title" className={styles.title}>
                {item.label || item.title}
              </h3>
              {item.role && (
                <p className={styles.role}>{item.role}</p>
              )}
            </div>

            {/* Fishtail tech-stack flags */}
            {item.skills?.filter(Boolean).length > 0 && (
              <>
                <span className={styles.flagsLabel}>Tech Stack</span>
                <div className={styles.flagsRow}>
                  {item.skills.filter(Boolean).map((skill) => {
                    const key = skill.toLowerCase().replace(/[\s./]/g, '');
                    const meta = skillsMap[key] ?? null;
                    return (
                      <MiniFlag key={skill} skillMeta={meta} label={skill} />
                    );
                  })}
                </div>
              </>
            )}

            {/* WHAT / HOW / WHY anchor nav — headings live here */}
          

            {/* View Certificate */}
            <a
              href={item.certificateLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.certBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M8 14l-2 7 6-2 6 2-2-7" />
              </svg>
              View Certificate
            </a>

          </div>

          {/* ───── RIGHT PANEL — blog body only ───── */}
          <div className={styles.right}>
            {activeSections.map(({ id, label, key }, idx) => (
              <section key={id} id={id} className={styles.section}>
                {/* Section number + label as blog-style heading */}
                <div className={styles.blogMeta}>
                  <span className={styles.blogIndex}>0{idx + 1}</span>
                  <span className={styles.blogDivider} aria-hidden="true" />
                  <span className={styles.blogLabel}>{label}</span>
                </div>
                <p className={styles.sectionText}>{item[key]}</p>
              </section>
            ))}
          </div>

        </div>{/* end split */}
      </div>
    </div>
  );
}

export default React.memo(ExperienceModal);
