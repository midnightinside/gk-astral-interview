import { type UserDto } from './authSources';
import { type ProfileDto } from './profileSources';
import { type WordDto } from './wordsSources';

/**
 * Локальные данные, используемые пока не задан VITE_API_BASE_URL.
 *
 * Слова вынесены в массив — как требует задание.
 */
export const WORDS_FIXTURE: WordDto[] = [
  {
    id: '1',
    word: 'benevolent',
    translation: 'доброжелательный, благожелательный',
    example: 'A benevolent stranger paid for our coffee and left quietly.',
  },
  {
    id: '2',
    word: 'resilient',
    translation: 'стойкий, быстро восстанавливающийся',
    example: 'Her resilient nature helped the team survive a rough quarter.',
  },
  {
    id: '3',
    word: 'eloquent',
    translation: 'красноречивый',
    example: 'The eloquent speaker turned dry numbers into a real story.',
  },
  {
    id: '4',
    word: 'meticulous',
    translation: 'скрупулёзный, тщательный',
    example: 'He keeps meticulous notes of every code review he receives.',
  },
  {
    id: '5',
    word: 'serendipity',
    translation: 'счастливая случайность',
    example: 'Finding that library was pure serendipity, not planning.',
  },
  {
    id: '6',
    word: 'candid',
    translation: 'откровенный, искренний',
    example: 'A candid retrospective is worth more than a polite one.',
  },
  {
    id: '7',
    word: 'tenacious',
    translation: 'упорный, цепкий',
    example: 'Debugging rewards the tenacious more than the talented.',
  },
  {
    id: '8',
    word: 'gregarious',
    translation: 'общительный',
    example: 'Our gregarious teammate knows everyone in the office.',
  },
  {
    id: '9',
    word: 'lucid',
    translation: 'ясный, понятный',
    example: 'The lucid documentation saved us a week of guessing.',
  },
  {
    id: '10',
    word: 'pragmatic',
    translation: 'практичный, прагматичный',
    example: 'A pragmatic fix today beats a perfect refactor never.',
  },
];

export const USER_FIXTURE: UserDto = {
  id: '1',
  login: 'admin',
  password: 'admin',
  name: 'Артём Васильев',
  email: 'admin@word-cards.dev',
};

export const PROFILE_FIXTURE: ProfileDto = {
  id: '1',
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
};
