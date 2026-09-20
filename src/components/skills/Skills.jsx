/**
 * Skills.jsx — Bento Grid Layout
 *
 * Languages 4×1 tall panel on the left (spans all 4 rows),
 * with other skills in 1×3 rows on the right.
 *
 *  ┌──────────────┬───────────────────────────────────────────┐
 *  │              │  Frontend             (1×3 row 1)         │
 *  │              ├───────────────────────────────────────────┤
 *  │  Languages   │  Backend & Runtime    (1×3 row 2)         │
 *  │  (4×1 left   ├───────────────────────────────────────────┤
 *  │   panel)     │  Databases            (1×3 row 3)         │
 *  │              ├───────────────────────────────────────────┤
 *  │              │  DevOps & Cloud       (1×3 row 4)         │
 *  └──────────────┴───────────────────────────────────────────┘
 */
import React, { useMemo } from 'react';
import SkillBanner from './SkillBanner';
import styles from './Skills.module.css';
import { SKILL_GROUPS, ALL_SKILLS } from './skillsData';

// Grid class mapping for the right rows:
//  [0] Frontend   → cellRight1 (1×3: row 1)
//  [1] Backend    → cellRight2 (1×3: row 2)
//  [2] Databases  → cellRight3 (1×3: row 3)
//  [3] DevOps     → cellRight4 (1×3: row 4)
const RIGHT_CELL_CLASSES = [
  styles.cellRight1,
  styles.cellRight2,
  styles.cellRight3,
  styles.cellRight4,
];

// ── Sub-components ─────────────────────────────────────────────────────────

function CategoryLabel({ label }) {
  return (
    <div className={styles.categoryLabel}>
      <span className={styles.categoryText}>{label}</span>
      <div className={styles.categoryRule} aria-hidden="true" />
    </div>
  );
}

function SkillRow({ group, groupIndex }) {
  return (
    <div className={styles.skillsRow}>
      {group.skills.map((skill, i) => (
        <div
          key={skill.id}
          className={styles.skillItem}
          style={{ animationDelay: `${(groupIndex * 80) + (i * 55)}ms` }}
        >
          <SkillBanner
            title={skill.title}
            iconSrc={skill.iconSrc}
            baseColor={skill.color}
            invertIcon={skill.invertIcon ?? false}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

function Skills() {
  const totalCount = useMemo(() => ALL_SKILLS.length, []);

  // Languages is the 4×1 tall panel on the left
  const languageGroup = useMemo(
    () => SKILL_GROUPS.find((g) => g.label.toLowerCase().includes('language')) || SKILL_GROUPS[0],
    []
  );

  // Other 4 skill groups are the 1×3 horizontal rows on the right
  const otherGroups = useMemo(
    () => SKILL_GROUPS.filter((g) => g !== languageGroup),
    [languageGroup]
  );

  return (
    <section id="skills" aria-labelledby="skills-heading" className={styles.section}>

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.eyebrow}>// Technical Arsenal</span>
        <h2 id="skills-heading" className={styles.heading}>
          Skills &amp;{' '}
          <span className={styles.headingAccent}>Technologies</span>
        </h2>
        <p className={styles.subheading}>
          A curated stack I use to ship production-grade,
          performant applications end-to-end.
        </p>
      </header>

      {/* Bento grid: 4×1 Languages panel on left, 1×3 other skill rows on right */}
      <div className={styles.bentoLayout}>

        {/* Languages: 4×1 left tall panel, spans all 4 rows */}
        <div className={styles.cellLeft}>
          <CategoryLabel label={languageGroup.label} />
          <SkillRow group={languageGroup} groupIndex={0} />
        </div>

        {/* Other skills: 4 groups on the right, each in a 1×3 row */}
        {otherGroups.map((group, i) => (
          <div key={group.label} className={RIGHT_CELL_CLASSES[i]}>
            <CategoryLabel label={group.label} />
            <SkillRow group={group} groupIndex={i + 1} />
          </div>
        ))}

      </div>


    </section>
  );
}

export default React.memo(Skills);
