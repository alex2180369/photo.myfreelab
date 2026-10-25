import Button from '../Button/Button';
import styles from './Hero.module.css';

const heroImage = {
  src: '/images/hero-900.webp',
  srcSet: '/images/hero-900.webp 900w, /images/hero-1800.webp 1800w',
};

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Фотограф · Казань</p>
          <h1 className={styles.title}>Фотографии, в которых вы — настоящие</h1>
          <p className={styles.lead}>
            Естественные портреты и семейные истории, к которым захочется
            возвращаться. Сохраняйте важные моменты в фотографиях, передающих ваши
            эмоции, характер и индивидуальность.
          </p>
          <div className={styles.actions}>
            <Button href="#contact">Записаться на фотосессию</Button>
            <Button href="#portfolio" variant="outline">
              Смотреть портфолио
            </Button>
          </div>
        </div>

        <figure className={styles.photo}>
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes="(max-width: 900px) 100vw, 46vw"
            width={900}
            height={1350}
            alt="Портрет девушки, опершейся подбородком на руки (демонстрационное фото)"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
