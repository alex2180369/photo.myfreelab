import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery, categories, responsive } from '../../data/gallery';
import SectionHeading from '../SectionHeading/SectionHeading';
import Reveal from '../Reveal/Reveal';
import Lightbox from './Lightbox';
import { ZoomIcon } from '../Icons/Icons';
import styles from './Portfolio.module.css';

const ALL = 'all';

const tabs = [{ id: ALL, label: 'Все работы' }, ...categories];

const sizesAttr = '(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 30vw';

export default function Portfolio() {
  const [active, setActive] = useState(ALL);
  const [currentIndex, setCurrentIndex] = useState(null);
  const openerRef = useRef(null);

  const items =
    active === ALL ? gallery : gallery.filter((item) => item.category === active);

  const categoryLabel = (id) => categories.find((cat) => cat.id === id)?.label ?? '';

  const openItem = (index, event) => {
    openerRef.current = event.currentTarget;
    setCurrentIndex(index);
  };

  const closeLightbox = useCallback(() => setCurrentIndex(null), []);

  // Возврат фокуса на миниатюру после закрытия лайтбокса.
  useEffect(() => {
    if (currentIndex === null && openerRef.current) {
      openerRef.current.focus();
      openerRef.current = null;
    }
  }, [currentIndex]);

  const selectTab = (id) => {
    setActive(id);
    setCurrentIndex(null);
  };

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Портфолио"
          title="Истории в фотографиях"
          lead="Ниже — демонстрационные снимки с разными пропорциями и настроениями. Перед публикацией их заменят на реальные работы Анны."
        />

        <Reveal as="div" className={styles.tabsWrap}>
          <div className={styles.tabs} role="group" aria-label="Категории портфолио">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tab}${active === tab.id ? ` ${styles.tabActive}` : ''}`}
                aria-pressed={active === tab.id}
                onClick={() => selectTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid}>
          {items.map((item, index) => {
            const { src, srcSet } = responsive(item.base);
            return (
              <Reveal as="figure" key={item.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.itemButton}
                  onClick={(event) => openItem(index, event)}
                  aria-label={`Открыть в увеличенном виде: ${item.alt}`}
                >
                  <img
                    src={src}
                    srcSet={srcSet}
                    sizes={sizesAttr}
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.zoom} aria-hidden="true">
                    <ZoomIcon />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {currentIndex !== null && (
        <Lightbox
          items={items}
          index={currentIndex}
          categoryLabel={categoryLabel}
          onClose={closeLightbox}
          onNavigate={setCurrentIndex}
        />
      )}
    </section>
  );
}
