const {validate} = require(`../src/validation`);
const {postsValidationSchema} = require(`../src/posts/validationSchema`);

// выкидывает ошибку, если ошибка валидатора отличается от эталонной
const errorMessageAssertion = (errorMessage, validationObject) => {
  try {
    validate(validationObject, postsValidationSchema);
  } catch (error) {
    if (error.message !== errorMessage) {
      throw new Error(`Error message should be:\n${errorMessage}\ngot:\n${error.message}`);
    }
  }
};

describe(`posts validation`, () => {
  const validPost = {
    filename: {
      mimetype: `image/`
    },
    scale: `50`,
    effect: `none`,
    hashtags: `#the_best`,
    description: `my cool photo`
  };

  describe(`check empty object`, () => {
    it(`should be required fields error`, () => {
      const errorMessage = `filename is required\nscale is required\neffect is required`;
      errorMessageAssertion(errorMessage, {});
    });
  });

  describe(`check invalid object`, () => {
    it(`should be scale is number error`, () => {
      const errorMessage = `scale should be number\nscale should be >= 0 and <= 100`;
      const invalidPost = Object.assign({}, validPost, {scale: `fifty`});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be scale range error`, () => {
      const errorMessage = `scale should be >= 0 and <= 100`;
      const invalidPost = Object.assign({}, validPost, {scale: `1000`});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be effect error`, () => {
      const errorMessage = `effect should be one of: none, chrome, sepia, marvin, phobos, heat`;
      const invalidPost = Object.assign({}, validPost, {effect: `cute`});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be less or 5 hashtags error`, () => {
      const errorMessage = `should be <= 5 hashtags`;
      const hashtags = `#a #b #c #d #e #f`;
      const invalidPost = Object.assign({}, validPost, {hashtags});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be hashtag starts with # error`, () => {
      const errorMessage = `hashtag should start with #`;
      const hashtags = `a @b`;
      const invalidPost = Object.assign({}, validPost, {hashtags});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be hashtag length error`, () => {
      const errorMessage = `hashtag length should be > 0 and <= 20`;
      const hashtags = `#qwertyuiopqwertyuiopqwerty`;
      const invalidPost = Object.assign({}, validPost, {hashtags});
      errorMessageAssertion(errorMessage, invalidPost);
    });

    it(`should be description error`, () => {
      const errorMessage = `description length should be < 140`;
      const description = `qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop
      qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop`;
      const invalidPost = Object.assign({}, validPost, {description});
      errorMessageAssertion(errorMessage, invalidPost);
    });
  });

  describe(`check valid object`, () => {
    it(`should not be erros`, () => {
      validate(validPost, postsValidationSchema);
    });
  });
});
