const HASHTAG_BANK = [`#красавица`, `#секси`, `#самаялучшая`, `#лучшенет`, `#бомба`, `#творческаяличность`,
  `#шикарная`, `#шикарнаяженщина`, `#другойтакойнет`, `#такуюжененайдешь`, `#личность`, `#богатыйвнутрениймир`,
  `#vip`, `#vipперсона`, `#vipотдых`, `#высшееобщество`, `#небыдло`, `#дорогобогато`, `#многоденег`, `#оченьдорого`,
  `#альфасамец`, `#самыйстильный`, `#горамускулов`, `#каждыйденьвкачалке`, `#опытный`, `#уменямногобаб`, `#популярный`,
  `#катаюсьнапорше`, `#катаюсьнабмв`, `#моидрузьянагелике`, `#опасный`, `#бандит`];

const EFFECTS = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];

const MAX_HASHTAG_COUNT = 5;
const MAX_SCALE = 100;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_LIKES = 1000;
const MAX_COMMENTS_COUNT = 10;
const MAX_COMMENT_LENGTH = 140;

// Функция возвращает случайное целое число
const getRandomNumber = (maxValue) =>
  Math.ceil(Math.random() * maxValue);

// Функция возвращает случайный элемент массива
const getRandomArrayElemet = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Функция возвращает случайный набор хештегов
const getRandomHashtags = () => {
  const hashtags = new Set();
  while (hashtags.size < Math.random() * MAX_HASHTAG_COUNT) {
    hashtags.add(getRandomArrayElemet(HASHTAG_BANK));
  }

  return Array.from(hashtags);
};

// Функция возвращает строку, состоящую из случайных букв английского алфавита и цифр
const getRandomString = (length) => {
  let randomString = ``;
  const pieceLength = Math.max(length, 10);
  const pieceCount = Math.ceil(length / pieceLength);

  for (let i = 0; i < pieceCount; i++) {
    randomString += Math.random().toString(36).substr(2, pieceLength);
  }

  return randomString;
};

// Функция возвращает массив со строками из случайных букв/цифр
const getRandomStrings = (count, maxStringLength) => {
  const randomStrings = [];
  for (let i = 0; i < count; i++) {
    randomStrings.push(getRandomString(getRandomNumber(maxStringLength)));
  }
  return randomStrings;
};

module.exports = {
  name: `entityGenerator`,
  description: `Генерирует тестовые данные`,
  generateEntity: () => ({
    "url": `https://picsum.photos/600/?random`,
    "scale": getRandomNumber(MAX_SCALE),
    "effect": getRandomArrayElemet(EFFECTS),
    "hashtags": getRandomHashtags(),
    "description": getRandomString(getRandomNumber(MAX_DESCRIPTION_LENGTH)),
    "likes": getRandomNumber(MAX_LIKES),
    "comments": getRandomStrings(getRandomNumber(MAX_COMMENTS_COUNT), MAX_COMMENT_LENGTH)
  }),
  consts: {MAX_HASHTAG_COUNT, MAX_SCALE, MAX_DESCRIPTION_LENGTH, MAX_LIKES, MAX_COMMENT_LENGTH}
};
