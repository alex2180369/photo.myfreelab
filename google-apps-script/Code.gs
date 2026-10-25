/**
 * Google Apps Script для приёма заявок с сайта (канал «Google Таблица»).
 *
 * Как подключить:
 * 1. Создайте Google Таблицу (sheets.google.com).
 * 2. Расширения → Apps Script. Удалите содержимое редактора и вставьте этот файл.
 * 3. Функция doPost() создаст лист «Заявки» с заголовками сама — просто
 *    сохраните и нажмите «Развернуть» → «Новое развёртывание».
 * 4. Тип: «Веб-приложение». Кто выполняет: «Мне». Доступ: «Все».
 * 5. Скопируйте URL вида https://script.google.com/macros/s/AKfy.../exec
 *    и вставьте его в src/config/formDelivery.js → googleSheets.webAppUrl.
 *
 * Данные попадают в таблицу строками: время, имя, контакт, формат,
 * комментарий, страница. Забирать их можно как обычно: сама таблица,
 * фильтры, выгрузка CSV, или программно через Google Sheets API.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Заявки');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Заявки');
      sheet.appendRow([
        'Время',
        'Имя',
        'Контакт',
        'Формат съёмки',
        'Комментарий',
        'Страница',
      ]);
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submittedAtLocal || new Date().toLocaleString(),
      data.name || '',
      data.contact || '',
      data.shoot || '',
      data.comment || '',
      data.page || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: 'Отправка заявок: POST-запросы с сайта' }),
  ).setMimeType(ContentService.MimeType.JSON);
}
