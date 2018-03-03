const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--license`,
  description: `Показывает лицензию программы`,
  execute() {
    console.log(packageInfo.license.cyan);
  }
};
