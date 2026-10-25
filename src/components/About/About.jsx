import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.photoWrap}>
          <figure className={styles.photo}>
            <img
              src="/images/about-900.webp"
              srcSet="/images/about-900.webp 900w, /images/about-1800.webp 1800w"
              sizes="(max-width: 900px) 100vw, 38vw"
              width={900}
              height={1350}
              alt="Временное изображение: улыбающаяся девушка у воды (заменить на портрет Анны)"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <p className={styles.note}>Временное изображение — замените на портрет Анны</p>
        </Reveal>

        <Reveal className={styles.content} delay={100}>
          <SectionHeading eyebrow="Обо мне" title="Давайте знакомиться" />
          <div className={styles.text}>
            <p>
              Меня зовут Анна Морозова. Я фотографирую людей, их характер, эмоции и
              отношения. Мне близки естественные кадры, спокойная атмосфера и
              внимание к деталям.
            </p>
            <p>
              На съёмке не нужно уметь позировать или чувствовать себя уверенно
              перед камерой. Мы вместе обсудим идею, выберем подходящий формат и
              создадим фотографии, в которых вы сможете узнать себя.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
