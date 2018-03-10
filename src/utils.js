const {Duplex} = require(`stream`);

const {POST_LIMITATION} = require(`./consts`);

const HASHTAG_BANK = [`#красавица`, `#секси`, `#самаялучшая`, `#лучшенет`, `#бомба`, `#творческаяличность`,
  `#шикарная`, `#шикарнаяженщина`, `#другойтакойнет`, `#такуюжененайдешь`, `#личность`, `#богатыйвнутрениймир`,
  `#vip`, `#vipперсона`, `#vipотдых`, `#высшееобщество`, `#небыдло`, `#дорогобогато`, `#многоденег`, `#оченьдорого`,
  `#альфасамец`, `#самыйстильный`, `#горамускулов`, `#каждыйденьвкачалке`, `#опытный`, `#уменямногобаб`, `#популярный`,
  `#катаюсьнапорше`, `#катаюсьнабмв`, `#моидрузьянагелике`, `#опасный`, `#бандит`];

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
  while (hashtags.size < Math.random() * POST_LIMITATION.MAX_HASHTAG_COUNT) {
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

// Функция возвращает дату, меньшую текущей на определенное количество дней
const getDateBefore = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// генерация данных поста
const generateEntity = () => ({
  "url": `https://picsum.photos/600/?random`,
  "scale": getRandomNumber(POST_LIMITATION.MAX_SCALE),
  "effect": getRandomArrayElemet(POST_LIMITATION.EFFECTS),
  "hashtags": getRandomHashtags(),
  "description": getRandomString(getRandomNumber(POST_LIMITATION.MAX_DESCRIPTION_LENGTH)),
  "likes": getRandomNumber(POST_LIMITATION.MAX_LIKES),
  "comments": getRandomStrings(getRandomNumber(POST_LIMITATION.MAX_COMMENTS_COUNT), POST_LIMITATION.MAX_COMMENT_LENGTH),
  "date": getDateBefore(getRandomNumber(POST_LIMITATION.DATE_RANGE) - 1).getTime()
});

// генерации данных нескольких постов
const generateEntities = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateEntity());
  }

  return data;
};

// создание стрима на основе буфера данных
const bufferToStream = (buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// пагинация данных
const getPaginatedData = async (cursor, skip = 0, limit = 50) => {
  const data = await cursor.skip(skip).limit(limit).toArray();
  return {
    data,
    pagination: {skip, limit}
  };
};

// проверяет удовлетворяет ли объект фильтру
const hasFilterValues = (obj, filter) => {
  let ret = true;
  for (let field in filter) {
    if (!obj[field] || obj[field] !== filter[field]) {
      ret = false;
      break;
    }
  }
  return ret;
};

module.exports = {
  name: `utils`,
  description: `функции утилиты`,
  generateEntity,
  generateEntities,
  bufferToStream,
  getPaginatedData,
  hasFilterValues
};
