const database = require(`../database`);
const {generateEntities} = require(`../utils`);
const {logger} = require(`../logger`);

const fillDb = async (postsCount) => {
  try {
    const db = await database;
    const posts = generateEntities(postsCount);
    await db.savePosts(posts);

    logger.info(`db filled with generated posts`);
  } catch (err) {
    logger.error(`failed to fill db with generated posts`, {error: err});
  }
};

module.exports = {
  name: `--fill`,
  description: `Заполняет базу данных случайными данными`,
  execute() {
    fillDb();
  }
};
