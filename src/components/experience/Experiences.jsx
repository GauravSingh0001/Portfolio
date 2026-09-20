import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './Experience.css';
import ExperienceModal from './ExperienceModal';
import { ALL_SKILLS } from '../skills/skillsData';

// Build a normalised key → skill-meta lookup for the fishtail flags
// e.g. 'node.js' → 'nodejs', 'tailwind css' → 'tailwindcss'
const SKILLS_MAP = Object.fromEntries(
  ALL_SKILLS.map((s) => [
    s.title.toLowerCase().replace(/[\s./]/g, ''),
    { iconSrc: s.iconSrc, color: s.color, invertIcon: s.invertIcon ?? false },
  ])
);

const DEFAULT_ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

/** Check user's motion preference */
const isReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Calculate flex-grow multiplier based on expand ratio and item count */
const calculateGrow = (count, ratio) => {
  if (count <= 1) return 1;
  const clampedRatio = Math.min(Math.max(ratio, 0.2), 0.9);
  return (clampedRatio * (count - 1)) / (1 - clampedRatio);
};

/**
 * AccordionGallery — Interactive expanding card accordion with GSAP tilt & parallax.
 */
function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  onCardClick = null
}) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(() => Math.min(Math.max(defaultIndex, 0), count - 1));
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Compute container inline CSS variables
  const containerStyle = useMemo(
    () => ({
      '--ag-accent': accentColor,
      '--ag-overlay': overlayColor,
      '--ag-text': textColor,
      '--ag-gap': `${gap}px`,
      '--ag-radius': `${radius}px`,
      height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
    }),
    [accentColor, overlayColor, textColor, gap, radius, vertical, height]
  );

  // Modal open/close controls
  const handleOpenModal = useCallback(item => {
    setActiveModalItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModalItem(null);
  }, []);

  // Scroll lock + Escape key are now handled inside <ExperienceModal>

  // GSAP animation layout update
  const applyLayout = useCallback(
    (animate = true) => {
      const container = rootRef.current;
      if (!container) return;

      const panels = container.querySelectorAll('.ag-panel');
      if (!panels.length) return;

      const grow = calculateGrow(count, expandRatio);
      const mediaSize = mediaSizeRef.current;
      const shouldAnimate = animate && !isReducedMotion();
      const dur = shouldAnimate ? duration : 0;

      tlRef.current?.kill();
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        const isActive = i === active;
        const media = panel.querySelector('.ag-panel__media');
        const bar = panel.querySelector('.ag-panel__bar');
        const text = panel.querySelector('.ag-panel__text');

        // 3D perspective rotation & flex expansion
        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        // Parallax image drift and grayscale transition
        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;

          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        // Label slide and fade
        if (showLabels && bar && text) {
          if (isActive) {
            tl.to(
              [bar, text],
              { opacity: 1, x: 0, duration: dur, ease, stagger: isReducedMotion() ? 0 : stagger },
              0
            );
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, parallax, grayscale, showLabels, stagger]
  );

  // ResizeObserver to dynamically adapt image size to viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const clampedRatio = Math.min(Math.max(expandRatio, 0.2), 0.9);

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * clampedRatio * 1.22);

      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(el);

    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  // Trigger animation on active index change
  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  // Kill timeline on unmount
  useEffect(() => () => tlRef.current?.kill(), []);

  // Event handlers
  const handleMouseEnter = useCallback(
    i => {
      if (trigger === 'hover') setActive(i);
    },
    [trigger]
  );

  const handleClick = useCallback(
    (i, e) => {
      e.preventDefault();
      setActive(i);
      const clickedItem = items[i];
      if (onCardClick) onCardClick(clickedItem, i);
      handleOpenModal(clickedItem);
    },
    [items, onCardClick, handleOpenModal]
  );

  const handleKeyDown = useCallback(
    (i, e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i + 1) % count);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i - 1 + count) % count);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(i, e);
      }
    },
    [count, handleClick]
  );

  return (
    <>
      <div
        ref={rootRef}
        className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
        style={containerStyle}
        role="list"
        aria-label="Image accordion gallery"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const Tag = item.link && item.link !== '#' ? 'a' : 'div';

          return (
            <Tag
              key={item.id ?? item.label ?? i}
              className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px` }}
              href={item.link && item.link !== '#' ? item.link : undefined}
              onClick={e => handleClick(i, e)}
              onMouseEnter={() => handleMouseEnter(i)}
              onFocus={() => setActive(i)}
              onKeyDown={e => handleKeyDown(i, e)}
              role="listitem"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={item.label}
            >
              <span className="ag-panel__frame">
                <span className="ag-panel__media">
                  <img
                    src={item.image}
                    alt={item.alt || item.label || ''}
                    draggable="false"
                    loading="lazy"
                  />
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
              </span>

              {showLabels && (
                <span className="ag-panel__label" aria-hidden="true">
                  <span className="ag-panel__bar" />
                  <span className="ag-panel__text">{item.label}</span>
                </span>
              )}
            </Tag>
          );
        })}
      </div>

      {/* ── Experience detail overlay ── */}
      {activeModalItem && (
        <ExperienceModal
          item={activeModalItem}
          onClose={handleCloseModal}
          skillsMap={SKILLS_MAP}
        />
      )}
    </>
  );
}

export default React.memo(AccordionGallery);

