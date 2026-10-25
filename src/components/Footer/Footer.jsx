import { navigation } from '../../data/navigation';
import { contacts, contactPlaceholder } from '../../data/contacts';
import { TelegramIcon, WhatsAppIcon, MailIcon } from '../Icons/Icons';
import styles from './Footer.module.css';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>Анна Морозова</p>
          <p className={styles.tagline}>Фотограф · {contacts.city}</p>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <ul className={styles.socials}>
          <li>
            {contacts.telegram ? (
              <a
                className={styles.socialLink}
                href={contacts.telegram}
                target="_blank"
                rel="noreferrer noopener"
              >
                <TelegramIcon />
                <span>Telegram</span>
              </a>
            ) : (
              <span className={styles.socialPlaceholder}>
                <TelegramIcon />
                <span>Telegram — {contactPlaceholder}</span>
              </span>
            )}
          </li>
          <li>
            {contacts.whatsapp ? (
              <a
                className={styles.socialLink}
                href={contacts.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            ) : (
              <span className={styles.socialPlaceholder}>
                <WhatsAppIcon />
                <span>WhatsApp — {contactPlaceholder}</span>
              </span>
            )}
          </li>
          <li>
            {contacts.email ? (
              <a className={styles.socialLink} href={`mailto:${contacts.email}`}>
                <MailIcon />
                <span>{contacts.email}</span>
              </a>
            ) : (
              <span className={styles.socialPlaceholder}>
                <MailIcon />
                <span>E-mail — {contactPlaceholder}</span>
              </span>
            )}
          </li>
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} Анна Морозова. Все права защищены.
        </p>
        <p className={styles.disclaimer}>
          Учебный проект: имя, цены и материалы сайта демонстрационные.
        </p>
      </div>
    </footer>
  );
}
