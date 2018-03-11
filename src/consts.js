const POST_LIMITATION = {
  EFFECTS: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`],
  MAX_HASHTAG_COUNT: 5,
  MAX_HASHTAG_LENGTH: 20,
  MIN_SCALE: 0,
  MAX_SCALE: 100,
  MAX_DESCRIPTION_LENGTH: 140,
  MAX_LIKES: 1000,
  MAX_COMMENTS_COUNT: 10,
  MAX_COMMENT_LENGTH: 140,
  DATE_RANGE: 7
};

const HTTP_STATUS_CODES = {
  OK: 200,
  VALIDATION_ERROR: 400,
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500,
  WRONG_METHOD: 501
};

module.exports = {
  name: `consts`,
  description: `константы`,
  POST_LIMITATION,
  HTTP_STATUS_CODES
};
