/**
 * Каналы доставки заявок с формы записи.
 *
 * Включите (enabled: true) и заполните хотя бы один канал — данные из формы
 * начнут реально сохраняться. Можно включить несколько сразу (например, бот
 * в Telegram + копия в Google Таблицу).
 *
 * Подробная настройка — в README.md, раздел «Отправка заявок».
 */
export const formDelivery = {
  /**
   * Канал 1. Telegram-бот — заявки прилетают мгновенно в чат/канал.
   * 1) Напишите @BotFather → /newbot → получите токен.
   * 2) Отправьте боту любое сообщение и откройте
   *    https://api.telegram.org/bot<ТОКЕН>/getUpdates — там будет ваш chat_id.
   * ВАЖНО: токен читается из кода страницы. Для небольшого сайта это
   * допустимо (худший сценарий — спам в вашем чате); для серьёзного
   * трафика вынесите отправку за серверный прокси.
   */
  telegram: {
    enabled: false,
    botToken: '', // например: '123456:ABC-DEF...'
    chatId: '', // например: '123456789'
  },

  /**
   * Канал 2. Google Таблица — каждая заявка строкой.
   * 1) Создайте таблицу → Расширения → Apps Script.
   * 2) Вставьте код из файла google-apps-script/Code.gs → Развернуть →
   *    Новое развёртывание → Веб-приложение → «Мне» → «Все» → скопируйте URL.
   * URL приходит вида https://script.google.com/macros/s/AKfy.../exec
   */
  googleSheets: {
    enabled: true,
    webAppUrl:
      'https://script.google.com/macros/s/AKfycbxDCx9ihA6Mj_HmKl0DyYUi3qz6GTo_iaxVSel2r_0hlfwi0KSKfoXx2WscL2dShSe1/exec',
  },

  /**
   * Канал 3. Formspree — письмо на вашу почту + веб-кабинет с заявками.
   * 1) Регистрация на formspree.io → New form → скопируйте ID формы
   *    (строка вида: https://formspree.io/f/abcdefgh).
   * Бесплатный тариф — до 50 заявок в месяц.
   */
  formspree: {
    enabled: false,
    formId: '',
  },
};
