const {MongoClient} = require(`mongodb`);

const {logger} = require(`./logger`);

const dbHost = process.env.DB_HOST || `localhost:27017`;
const url = `mongodb://${dbHost}`;

let dbClient;

const database = MongoClient.connect(url)
    .then((client) => {
      dbClient = client;
      const db = client.db(`kekstagram`);

      logger.info(`db started at ${url}`);

      return db;
    })
    .catch((err) => {
      logger.error(`Failed to connect to db`, {error: err});
      process.exit(1);
    });

process.on(`exit`, () => {
  if (dbClient) {
    dbClient.close();
  }
});

module.exports = {
  name: `database`,
  description: `клиент базы данных mongodb`,
  database
};
