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
    syllables: 'be·nev·o·lent',
    partOfSpeech: 'adjective',
    definition: 'well meaning and kindly.',
    translation: 'доброжелательный, благожелательный',
    example: 'a benevolent smile',
  },
  {
    word: 'resilient',
    syllables: 're·sil·ient',
    partOfSpeech: 'adjective',
    definition: 'able to recover quickly from difficulties.',
    translation: 'стойкий, быстро восстанавливающийся',
    example: 'a resilient team',
  },
  {
    word: 'eloquent',
    syllables: 'el·o·quent',
    partOfSpeech: 'adjective',
    definition: 'fluent and persuasive in speech or writing.',
    translation: 'красноречивый',
    example: 'an eloquent speaker',
  },
  {
    word: 'meticulous',
    syllables: 'me·tic·u·lous',
    partOfSpeech: 'adjective',
    definition: 'showing great attention to detail.',
    translation: 'скрупулёзный, тщательный',
    example: 'meticulous notes',
  },
  {
    word: 'serendipity',
    syllables: 'ser·en·dip·i·ty',
    partOfSpeech: 'noun',
    definition: 'the occurrence of happy events by chance.',
    translation: 'счастливая случайность',
    example: 'a moment of serendipity',
  },
  {
    word: 'candid',
    syllables: 'can·did',
    partOfSpeech: 'adjective',
    definition: 'truthful and straightforward.',
    translation: 'откровенный, искренний',
    example: 'a candid answer',
  },
  {
    word: 'tenacious',
    syllables: 'te·na·cious',
    partOfSpeech: 'adjective',
    definition: 'keeping a firm hold of something; persistent.',
    translation: 'упорный, цепкий',
    example: 'a tenacious researcher',
  },
  {
    word: 'gregarious',
    syllables: 'gre·gar·i·ous',
    partOfSpeech: 'adjective',
    definition: 'fond of company; sociable.',
    translation: 'общительный',
    example: 'a gregarious host',
  },
  {
    word: 'lucid',
    syllables: 'lu·cid',
    partOfSpeech: 'adjective',
    definition: 'expressed clearly; easy to understand.',
    translation: 'ясный, понятный',
    example: 'a lucid explanation',
  },
  {
    word: 'pragmatic',
    syllables: 'prag·mat·ic',
    partOfSpeech: 'adjective',
    definition: 'dealing with things realistically.',
    translation: 'практичный, прагматичный',
    example: 'a pragmatic decision',
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
