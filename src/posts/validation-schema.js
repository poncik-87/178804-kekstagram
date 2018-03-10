const {POST_LIMITATION} = require(`../consts`);

const postsValidationSchema = {
  filename: {
    isRequired: true,
    rules: [
      {
        rule: (image) => image.mimetype.startsWith(`image/`),
        errorMessage: `image should be image format`
      }
    ]
  },
  scale: {
    isRequired: true,
    rules: [
      {
        rule: (scale) => !isNaN(Number(scale)),
        errorMessage: `scale should be number`
      },
      {
        rule: (scale) => {
          const scaleNum = Number(scale);
          return scaleNum >= POST_LIMITATION.MIN_SCALE && scaleNum <= POST_LIMITATION.MAX_SCALE;
        },
        errorMessage: `scale should be >= ${POST_LIMITATION.MIN_SCALE} and <= ${POST_LIMITATION.MAX_SCALE}`
      }
    ]
  },
  effect: {
    isRequired: true,
    rules: [
      {
        rule: (effect) =>
          POST_LIMITATION.EFFECTS.includes(effect),
        errorMessage: `effect should be one of: ${POST_LIMITATION.EFFECTS.join(`, `)}`
      }
    ]
  },
  hashtags: {
    isRequired: false,
    rules: [
      {
        rule: (hashtags) => hashtags.split(` `).length <= POST_LIMITATION.MAX_HASHTAG_COUNT,
        errorMessage: `should be <= ${POST_LIMITATION.MAX_HASHTAG_COUNT} hashtags`
      },
      {
        rule: (hashtags) => !hashtags.split(` `).some((hashtag) =>
          !hashtag.startsWith(`#`)),
        errorMessage: `hashtag should start with #`
      },
      {
        rule: (hashtags) => !hashtags.split(` `).some((hashtag) =>
          hashtag.length < 1 || hashtag.length > POST_LIMITATION.MAX_HASHTAG_LENGTH),
        errorMessage: `hashtag length should be > 0 and <= ${POST_LIMITATION.MAX_HASHTAG_LENGTH}`
      },
      {
        rule: (hashtags) => {
          const hashtagsArray = hashtags.split(` `);
          const hashtagsSet = new Set(hashtagsArray);

          return hashtagsSet.size === hashtagsArray.length;
        },
        errorMessage: `hashtags should be unique`
      },
    ]
  },
  description: {
    isRequired: false,
    rules: [
      {
        rule: (description) => description.length < POST_LIMITATION.MAX_DESCRIPTION_LENGTH,
        errorMessage: `description length should be < ${POST_LIMITATION.MAX_DESCRIPTION_LENGTH}`
      }
    ]
  },
};

module.exports = {
  name: `postsValidationSchema`,
  description: `схема валидации постов`,
  postsValidationSchema
};
