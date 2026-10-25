import { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import Button from '../Button/Button';
import { packages } from '../../data/packages';
import { contacts, contactPlaceholder } from '../../data/contacts';
import { TelegramIcon, WhatsAppIcon, MailIcon } from '../Icons/Icons';
import { submitLead, isConfigured, enabledChannelNames } from '../../lib/formSubmission';
import styles from './Contact.module.css';

const shootOptions = [
  ...packages.map((pkg) => ({ value: pkg.name, label: `${pkg.name} — ${pkg.price}` })),
  { value: 'Другой формат', label: 'Другой формат — обсудим' },
];

const notConfiguredText =
  'Отправка заявок пока не подключена: ни один канал не настроен. ' +
  'Включите Telegram-бота, Google Таблицу или Formspree в файле src/config/formDelivery.js ' +
  '— подробности в README.';

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Укажите, как к вам обращаться';
  }
  if (values.contact.trim().length < 5) {
    errors.contact = 'Оставьте контакт: телефон, e-mail или ник в мессенджере';
  }
  if (!values.shoot) {
    errors.shoot = 'Выберите формат съёмки';
  }
  return errors;
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> — необязательно</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ selectedPackage }) {
  const [values, setValues] = useState({
    name: '',
    contact: '',
    shoot: '',
    comment: '',
    company: '', // honeypot: скрытое поле для спам-ботов
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | partial | failed
  const [delivery, setDelivery] = useState([]); // результаты по каналам
  const refs = useRef({});

  const configured = isConfigured();

  // Предзаполнение формата при нажатии «Выбрать пакет» в разделе цен.
  useEffect(() => {
    if (!selectedPackage) return;
    setValues((prev) => ({ ...prev, shoot: selectedPackage }));
    setErrors((prev) => {
      if (!prev.shoot) return prev;
      const next = { ...prev };
      delete next.shoot;
      return next;
    });
  }, [selectedPackage]);

  const setField = (name) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus('idle');
      refs.current[firstInvalid]?.focus();
      return;
    }

    // Honeypot заполнен — скорее всего спам-бот: молча не отправляем.
    if (values.company.trim() !== '') {
      setStatus('sent');
      setDelivery([]);
      return;
    }

    if (!configured) {
      // Каналы не настроены — сообщаем честно, ничего не имитируем.
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const results = await submitLead(values);
      setDelivery(results);
      const okCount = results.filter((r) => r.ok).length;
      if (okCount === results.length) {
        setStatus('sent');
      } else if (okCount > 0) {
        setStatus('partial');
      } else {
        setStatus('failed');
      }
    } catch {
      setDelivery([]);
      setStatus('failed');
    }
  };

  const errorId = {
    name: 'name-error',
    contact: 'contact-field-error',
    shoot: 'shoot-error',
  };
  const describedBy = (name) => (errors[name] ? errorId[name] : undefined);

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Запись"
          title="Создадим вашу историю?"
          lead="Расскажите о своей идее — обсудим формат съёмки и свободные даты"
        />

        <div className={styles.layout}>
          <Reveal className={styles.formWrap}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <Field id="name" label="Имя" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={styles.input}
                  placeholder="Как к вам обращаться"
                  value={values.name}
                  onChange={setField('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                  required
                  ref={(node) => {
                    refs.current.name = node;
                  }}
                />
              </Field>

              <Field id="contact-field" label="Контакт для связи" error={errors.contact}>
                <input
                  id="contact-field"
                  name="contact"
                  type="text"
                  className={styles.input}
                  placeholder="Телефон, e-mail или ник в мессенджере"
                  value={values.contact}
                  onChange={setField('contact')}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={describedBy('contact')}
                  required
                  ref={(node) => {
                    refs.current.contact = node;
                  }}
                />
              </Field>

              <Field id="shoot" label="Какую съёмку хотите?" error={errors.shoot}>
                <select
                  id="shoot"
                  name="shoot"
                  className={styles.select}
                  value={values.shoot}
                  onChange={setField('shoot')}
                  aria-invalid={Boolean(errors.shoot)}
                  aria-describedby={describedBy('shoot')}
                  required
                  ref={(node) => {
                    refs.current.shoot = node;
                  }}
                >
                  <option value="">Выберите формат</option>
                  {shootOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="comment" label="Комментарий" optional>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className={styles.textarea}
                  placeholder="Ваши пожелания, идея съёмки, удобные даты"
                  value={values.comment}
                  onChange={setField('comment')}
                />
              </Field>

              {/* honeypot: скрытое от людей поле, заполняют только боты */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="company">Компания</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={setField('company')}
                />
              </div>

              <div className={styles.submitRow}>
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
                </Button>
                <p className={styles.formNote}>
                  Ваши данные используются только для связи по вопросу съёмки.
                </p>
              </div>

              {status === 'unconfigured' && (
                <p className={styles.notice} role="status">
                  {notConfiguredText}
                </p>
              )}

              {status === 'sent' && (
                <p className={styles.noticeSuccess} role="status">
                  Спасибо, заявка отправлена! Мы свяжемся с вами по указанному контакту.
                </p>
              )}

              {status === 'partial' && (
                <p className={styles.noticeSuccess} role="status">
                  Заявка отправлена (
                  {delivery.filter((r) => r.ok).map((r) => r.channel).join(', ')}). Остальные
                  каналы доставки сейчас недоступны.
                </p>
              )}

              {status === 'failed' && (
                <p className={styles.noticeError} role="status">
                  Не удалось отправить заявку — попробуйте ещё раз позже или свяжитесь
                  напрямую. Данные формы сохранены.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal as="aside" className={styles.aside} delay={100}>
            <h3 className={styles.asideTitle}>Связаться напрямую</h3>
            <ul className={styles.contacts}>
              <li>
                {contacts.telegram ? (
                  <a
                    className={styles.contactLink}
                    href={contacts.telegram}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <TelegramIcon />
                    <span>Telegram</span>
                  </a>
                ) : (
                  <span className={styles.placeholder}>
                    <TelegramIcon />
                    <span>Telegram — {contactPlaceholder}</span>
                  </span>
                )}
              </li>
              <li>
                {contacts.whatsapp ? (
                  <a
                    className={styles.contactLink}
                    href={contacts.whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp</span>
                  </a>
                ) : (
                  <span className={styles.placeholder}>
                    <WhatsAppIcon />
                    <span>WhatsApp — {contactPlaceholder}</span>
                  </span>
                )}
              </li>
              <li>
                {contacts.email ? (
                  <a className={styles.contactLink} href={`mailto:${contacts.email}`}>
                    <MailIcon />
                    <span>{contacts.email}</span>
                  </a>
                ) : (
                  <span className={styles.placeholder}>
                    <MailIcon />
                    <span>E-mail — {contactPlaceholder}</span>
                  </span>
                )}
              </li>
              <li className={styles.city}>Город: {contacts.city}</li>
            </ul>
            <p className={styles.asideNote}>
              Номера телефона и ссылки на аккаунты не выдумываются: реальные контакты
              добавляются здесь перед публикацией.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
