import { formDelivery } from '../config/formDelivery';

/**
 * Отправка заявки во все включённые каналы (см. src/config/formDelivery.js).
 * Возвращает список результатов: [{ channel, ok, error }].
 */

function buildPayload(values) {
  const now = new Date();
  return {
    name: values.name.trim(),
    contact: values.contact.trim(),
    shoot: values.shoot,
    comment: values.comment.trim(),
    page: window.location.href,
    submittedAt: now.toISOString(),
    submittedAtLocal: now.toLocaleString('ru-RU'),
  };
}

function formatMessage(payload) {
  const lines = [
    'Новая заявка с сайта — Анна Морозова',
    '',
    `Имя: ${payload.name}`,
    `Контакт: ${payload.contact}`,
    `Формат съёмки: ${payload.shoot}`,
    `Комментарий: ${payload.comment || '—'}`,
    `Страница: ${payload.page}`,
    `Время: ${payload.submittedAtLocal}`,
  ];
  return lines.join('\n');
}

async function sendToTelegram(payload) {
  const { botToken, chatId } = formDelivery.telegram;
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: formatMessage(payload) }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.description || `HTTP ${response.status}`);
  }
}

async function sendToGoogleSheets(payload) {
  // Content-Type text/plain — чтобы браузер не делал CORS-preflight:
  // Apps Script не отвечает на OPTIONS-запросы.
  const response = await fetch(formDelivery.googleSheets.webAppUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

async function sendToFormspree(payload) {
  const { formId } = formDelivery.formspree;
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

/** Проверка: подключён ли хотя бы один канал. */
export function isConfigured() {
  return Boolean(
    (formDelivery.telegram.enabled && formDelivery.telegram.botToken && formDelivery.telegram.chatId) ||
      (formDelivery.googleSheets.enabled && formDelivery.googleSheets.webAppUrl) ||
      (formDelivery.formspree.enabled && formDelivery.formspree.formId),
  );
}

/** Список включённых каналов для сообщений в интерфейсе. */
export function enabledChannelNames() {
  const names = [];
  if (formDelivery.telegram.enabled && formDelivery.telegram.botToken && formDelivery.telegram.chatId) {
    names.push('Telegram');
  }
  if (formDelivery.googleSheets.enabled && formDelivery.googleSheets.webAppUrl) {
    names.push('Google Таблица');
  }
  if (formDelivery.formspree.enabled && formDelivery.formspree.formId) {
    names.push('Formspree');
  }
  return names;
}

export async function submitLead(values) {
  const payload = buildPayload(values);
  const channels = [];

  if (formDelivery.telegram.enabled && formDelivery.telegram.botToken && formDelivery.telegram.chatId) {
    channels.push({ channel: 'Telegram', run: () => sendToTelegram(payload) });
  }
  if (formDelivery.googleSheets.enabled && formDelivery.googleSheets.webAppUrl) {
    channels.push({ channel: 'Google Таблица', run: () => sendToGoogleSheets(payload) });
  }
  if (formDelivery.formspree.enabled && formDelivery.formspree.formId) {
    channels.push({ channel: 'Formspree', run: () => sendToFormspree(payload) });
  }

  const results = await Promise.allSettled(channels.map((item) => item.run()));

  return results.map((result, index) => ({
    channel: channels[index].channel,
    ok: result.status === 'fulfilled',
    error: result.status === 'rejected' ? String(result.reason?.message || result.reason) : null,
  }));
}
