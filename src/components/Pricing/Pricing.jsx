import Button from '../Button/Button';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { packages, pricingNote } from '../../data/packages';
import styles from './Pricing.module.css';

export default function Pricing({ onChoose }) {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Цены"
          title="Выберите свою съёмку"
          lead="Три формата на выбор — от короткой встречи до полноценной истории. Любую съёмку можно адаптировать под вашу задачу."
        />

        <div className={styles.grid}>
          {packages.map((pkg, index) => (
            <Reveal as="article" key={pkg.id} className={styles.card} delay={index * 90}>
              <h3 className={styles.name}>{pkg.name}</h3>
              <p className={styles.price}>{pkg.price}</p>
              <ul className={styles.features}>
                {pkg.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={styles.button} onClick={() => onChoose(pkg.name)}>
                Выбрать пакет
              </Button>
            </Reveal>
          ))}
        </div>

        <p className={styles.note}>{pricingNote}</p>
      </div>
    </section>
  );
}
