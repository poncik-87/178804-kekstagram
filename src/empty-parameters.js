const packageInfo = require(`../package.json`);

module.exports = {
  description: `Shows message for empty parameter`,
  execute() {
    console.log(
        `Привет!\n` +
        `Эта программа будет запускать сервер кекстаграма\n` +
        `Автор: ${packageInfo.author}`
    );
  }
};
