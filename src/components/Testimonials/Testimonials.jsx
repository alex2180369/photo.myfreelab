import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Отзывы"
          title="Тёплые слова"
          lead="Раздел готов к заполнению: здесь появятся настоящие отзывы клиентов. Сейчас показаны нейтральные заглушки."
        />

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <Reveal
              as="figure"
              key={item.id}
              className={styles.card}
              delay={index * 90}
            >
              <blockquote className={styles.quote}>
                <p>{item.text}</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.shoot}>{item.shoot}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
