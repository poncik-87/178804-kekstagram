const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

let dbClient;

const database = MongoClient.connect(url)
    .then((client) => {
      dbClient = client;
      return client.db(`kekstagram`);
    })
    .catch((err) => {
      console.error(`Failed to connect to mongoDB`, err);
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
