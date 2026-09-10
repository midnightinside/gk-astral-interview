/**
 * Наполнение мок-сервиса данными приложения.
 *
 * Использование:
 *   node scripts/seed-mockapi.mjs https://<projectId>.mockapi.io/api/v1
 *
 * Скрипт идемпотентен: перед записью удаляет существующие записи ресурсов
 * `words` и `users`.
 */

const WORDS = [
  {
    word: 'benevolent',
    translation: 'доброжелательный, благожелательный',
    example: 'A benevolent stranger paid for our coffee and left quietly.',
  },
  {
    word: 'resilient',
    translation: 'стойкий, быстро восстанавливающийся',
    example: 'Her resilient nature helped the team survive a rough quarter.',
  },
  {
    word: 'eloquent',
    translation: 'красноречивый',
    example: 'The eloquent speaker turned dry numbers into a real story.',
  },
  {
    word: 'meticulous',
    translation: 'скрупулёзный, тщательный',
    example: 'He keeps meticulous notes of every code review he receives.',
  },
  {
    word: 'serendipity',
    translation: 'счастливая случайность',
    example: 'Finding that library was pure serendipity, not planning.',
  },
  {
    word: 'candid',
    translation: 'откровенный, искренний',
    example: 'A candid retrospective is worth more than a polite one.',
  },
  {
    word: 'tenacious',
    translation: 'упорный, цепкий',
    example: 'Debugging rewards the tenacious more than the talented.',
  },
  {
    word: 'gregarious',
    translation: 'общительный',
    example: 'Our gregarious teammate knows everyone in the office.',
  },
  {
    word: 'lucid',
    translation: 'ясный, понятный',
    example: 'The lucid documentation saved us a week of guessing.',
  },
  {
    word: 'pragmatic',
    translation: 'практичный, прагматичный',
    example: 'A pragmatic fix today beats a perfect refactor never.',
  },
];

const USER = {
  login: 'admin',
  password: 'admin',
  name: 'Артём Васильев',
  email: 'admin@word-cards.dev',
  profile: {
    lastName: 'Васильев',
    firstName: 'Артём',
    middleName: 'Сергеевич',
    birthDate: '1996-04-18',
    age: 30,
    email: 'admin@word-cards.dev',
    phone: '+7 900 000-00-00',
    country: 'russia',
    city: 'Калуга',
    timezone: 'msk',
    position: 'frontend',
    experienceYears: 5,
    employmentType: 'full',
    salary: 250000,
    workSchedule: '5/2, гибкое начало дня',
    skills: ['typescript', 'react', 'redux'],
    languages: ['ru', 'en'],
    preferredContact: 'email',
    telegram: '',
    about:
      'Фронтенд-разработчик. Люблю понятные интерфейсы и предсказуемую архитектуру.',
  },
};

const baseUrl = (process.argv[2] ?? '').replace(/\/$/, '');

if (!baseUrl) {
  console.error(
    'Укажите базовый URL: node scripts/seed-mockapi.mjs https://<projectId>.mockapi.io/api/v1',
  );
  process.exit(1);
}

const request = async (method, path, body) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${method} ${path} → HTTP ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
};

const list = async (resource) => {
  const response = await fetch(`${baseUrl}/${resource}`);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [];
};

const clear = async (resource) => {
  const items = await list(resource);

  for (const item of items) {
    await request('DELETE', `/${resource}/${item.id}`);
  }

  return items.length;
};

const seed = async () => {
  console.log(`Мок-сервис: ${baseUrl}`);

  const removedWords = await clear('words');
  const removedUsers = await clear('users');

  console.log(`Удалено записей: words ${removedWords}, users ${removedUsers}`);

  for (const word of WORDS) {
    await request('POST', '/words', word);
  }

  await request('POST', '/users', USER);

  const words = await list('words');
  const users = await list('users');
  const [user] = users;

  console.log(`Записано: words ${words.length}, users ${users.length}`);
  console.log(`Первое слово: ${words[0]?.word} — ${words[0]?.translation}`);
  console.log(`Пользователь: ${user?.login} / ${user?.name} (id ${user?.id})`);
  console.log(`Полей в профиле: ${Object.keys(user?.profile ?? {}).length}`);
};

seed().catch((error) => {
  console.error(`Не удалось наполнить мок-сервис: ${error.message}`);
  process.exit(1);
});
