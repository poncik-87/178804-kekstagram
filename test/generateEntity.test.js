const assert = require(`assert`);
const {generateEntity, consts} = require(`../src/entityGenerator`);

const MAX_HASHTAG_LENGTH = 20;

// Функция проверяет, что все элементы массива определенного типа
const hasOnlyType = (array, type) =>
  !array.some((arrayItem) => typeof arrayItem !== type);

// Функция проверяет, что строки массива фиксированной длины
const hasOnlyLimitedStrings = (array, length) =>
  !array.some((arrayItem) => arrayItem.length > length);

// Функция проверяет, что generateEntity генерирует уникальные простые значения
const isGeneratesUniqueSimpleValue = (field) => {
  let set = new Set();
  for (let i = 0, testIterations = 5; i < testIterations; i++) {
    set.add(generateEntity()[field]);
  }

  return set.size !== 1;
};

describe(`Check generateEntity`, () => {
  describe(`Check module contains function`, () => {
    it(`Should contains generateEntity function`, () => {
      assert.equal(typeof generateEntity, `function`);
    });

    it(`Should generateEntity return object`, () => {
      assert.equal(typeof generateEntity(), `object`);
    });
  });

  describe(`Check url field`, () => {
    const entity = generateEntity();

    it(`Should be string`, () => {
      assert.equal(typeof entity.url, `string`);
    });

    it(`Should has url mask`, () => {
      assert.ok(entity.url.match(/^https?:\/\/(\w)+\.(\w)+(\/(\w)+)*\/?(\?(.)+)?$/));
    });
  });

  describe(`Check scale field`, () => {
    const entity = generateEntity();

    it(`Should be number`, () => {
      assert.equal(typeof entity.scale, `number`);
    });

    it(`Should be in range 0..${consts.MAX_SCALE}`, () => {
      assert.ok(entity.scale >= 0 && entity.scale <= consts.MAX_SCALE);
    });

    it(`Should be integer`, () => {
      assert.ok(Number.isInteger(entity.scale));
    });

    it(`Should be random`, () => {
      assert.ok(isGeneratesUniqueSimpleValue(`scale`));
    });
  });

  describe(`Check effect field`, () => {
    const entity = generateEntity();

    it(`Should be string`, () => {
      assert.equal(typeof entity.effect, `string`);
    });

    it(`Should be one of: 'none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'`, () => {
      const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
      assert.ok(effects.includes(entity.effect));
    });

    it(`Should be random`, () => {
      assert.ok(isGeneratesUniqueSimpleValue(`effect`));
    });
  });

  describe(`Check hashtags field`, () => {
    const entity = generateEntity();

    // Функция проверяет, что все элементы массива начинаются с # и содержат буквенно-цифровые символы
    const hasOnlyHashtags = (array) =>
      !array.some((arrayItem) => !arrayItem.match(/^\#(\w|[а-яё])*$/ig));

    it(`Should be array`, () => {
      assert.ok(Array.isArray(entity.hashtags));
    });

    it(`Should be array of strings`, () => {
      assert.ok(hasOnlyType(entity.hashtags, `string`));
    });

    it(`Should contains <= ${consts.MAX_HASHTAG_COUNT} items`, () => {
      assert.ok(entity.hashtags.length <= consts.MAX_HASHTAG_COUNT);
    });

    it(`Should contains strings starts with #, without spaces`, () => {
      assert.ok(hasOnlyHashtags(entity.hashtags));
    });

    it(`Should contains unique words`, () => {
      const hashtagsSet = new Set(entity.hashtags);
      assert.equal(hashtagsSet.size, entity.hashtags.length);
    });

    it(`Should contains strings <= ${MAX_HASHTAG_LENGTH} chars`, () => {
      assert.ok(hasOnlyLimitedStrings(entity.hashtags, MAX_HASHTAG_LENGTH));
    });

    it(`Should be random`, () => {
      const otherEntity = generateEntity();
      assert.notDeepEqual(entity.hashtags, otherEntity.hashtags);
    });
  });

  describe(`Check description field`, () => {
    const entity = generateEntity();

    it(`Should be string`, () => {
      assert.equal(typeof entity.description, `string`);
    });

    it(`Should be <= ${consts.MAX_DESCRIPTION_LENGTH} chars`, () => {
      assert.ok(entity.description.length <= consts.MAX_DESCRIPTION_LENGTH);
    });

    it(`Should be random`, () => {
      assert.ok(isGeneratesUniqueSimpleValue(`description`));
    });
  });

  describe(`Check likes field`, () => {
    const entity = generateEntity();

    it(`Should be number`, () => {
      assert.equal(typeof entity.likes, `number`);
    });

    it(`Should be in range 0..${consts.MAX_LIKES}`, () => {
      assert.ok(entity.likes >= 0 && entity.likes <= consts.MAX_LIKES);
    });

    it(`Should be integer`, () => {
      assert.ok(Number.isInteger(entity.likes));
    });

    it(`Should be random`, () => {
      assert.ok(isGeneratesUniqueSimpleValue(`likes`));
    });
  });

  describe(`Check comments field`, () => {
    const entity = generateEntity();

    it(`Should be array`, () => {
      assert.ok(Array.isArray(entity.comments));
    });

    it(`Should be array of strings`, () => {
      assert.ok(hasOnlyType(entity.comments, `string`));
    });

    it(`Should contains strings <= ${consts.MAX_COMMENT_LENGTH} chars`, () => {
      assert.ok(hasOnlyLimitedStrings(entity.comments, consts.MAX_COMMENT_LENGTH));
    });

    it(`Should be random`, () => {
      const otherEntity = generateEntity();
      assert.notDeepEqual(entity.comments, otherEntity.comments);
    });
  });
});
