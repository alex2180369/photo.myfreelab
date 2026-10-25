import { useEffect, useRef } from 'react';
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from '../Icons/Icons';
import styles from './Lightbox.module.css';

/**
 * Увеличенный просмотр фотографии: клавиатура (Esc, ←, →),
 * блокировка прокрутки страницы, возврат фокуса на миниатюру.
 */
export default function Lightbox({ items, index, categoryLabel, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const item = items[index];
  const largeSrc = `${item.base}-1800.webp`;

  // Актуальные значения для клавиатурных обработчиков.
  const stateRef = useRef({ index, items, onClose, onNavigate });
  stateRef.current = { index, items, onClose, onNavigate };

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      const { index: i, items: list, onClose: close, onNavigate: navigate } = stateRef.current;
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        navigate((i - 1 + list.length) % list.length);
      } else if (event.key === 'ArrowRight') {
        navigate((i + 1) % list.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const goPrev = () => onNavigate((index - 1 + items.length) % items.length);
  const goNext = () => onNavigate((index + 1) % items.length);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Просмотр фотографии"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.toolbar}>
          <p className={styles.category}>{categoryLabel(item.category)}</p>
          <button
            type="button"
            ref={closeRef}
            className={styles.iconButton}
            onClick={onClose}
            aria-label="Закрыть просмотр"
          >
            <CloseIcon />
          </button>
        </div>

        <figure className={styles.figure}>
          <img
            className={styles.image}
            src={largeSrc}
            alt={item.alt}
            width={item.width}
            height={item.height}
            decoding="async"
          />
          <figcaption className={styles.caption}>{item.alt}</figcaption>
        </figure>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={goPrev}
            aria-label="Предыдущая фотография"
          >
            <ArrowLeftIcon />
          </button>
          <span className={styles.counter} aria-live="polite">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            className={styles.iconButton}
            onClick={goNext}
            aria-label="Следующая фотография"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
