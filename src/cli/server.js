const server = require(`../server`);

module.exports = {
  name: `--server`,
  description: `Запускает http сервер`,
  execute(port) {
    server.run(port);
  }
};
