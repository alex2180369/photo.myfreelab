import styles from './SectionHeading.module.css';

/**
 * Заголовок раздела: надзаголовок, заголовок, лид-абзац.
 */
export default function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  return (
    <header className={`${styles.heading}${align === 'center' ? ` ${styles.center}` : ''}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
