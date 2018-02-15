const packageInfo = require(`../package.json`);

module.exports = {
  description: `Показывает сообщение при пустых параметрах`,
  execute() {
    console.log(
        `Привет!\n` +
        `Эта программа будет запускать сервер кекстаграма\n` +
        `Автор: ${packageInfo.author}`
    );
  }
};
