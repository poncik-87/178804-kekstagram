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
          return scaleNum >= 0 && scaleNum <= 100;
        },
        errorMessage: `scale should be >= 0 and <= 100`
      }
    ]
  },
  effect: {
    isRequired: true,
    rules: [
      {
        rule: (effect) =>
          [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`].includes(effect),
        errorMessage: `effect should be one of: none, chrome, sepia, marvin, phobos, heat`
      }
    ]
  },
  hashtags: {
    isRequired: false,
    rules: [
      {
        rule: (hashtags) => hashtags.split(` `).length <= 5,
        errorMessage: `should be <= 5 hashtags`
      },
      {
        rule: (hashtags) => !hashtags.split(` `).some((hashtag) =>
          !hashtag.startsWith(`#`)),
        errorMessage: `hashtag should start with #`
      },
      {
        rule: (hashtags) => !hashtags.split(` `).some((hashtag) =>
          hashtag.length < 1 || hashtag.length > 20),
        errorMessage: `hashtag length should be > 0 and <= 20`
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
        rule: (description) => description.length < 140,
        errorMessage: `description length should be < 140`
      }
    ]
  },
};

module.exports = {
  name: `postsValidationSchema`,
  description: `схема валидации постов`,
  postsValidationSchema
};
