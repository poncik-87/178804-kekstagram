const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `Показывает версию программы`,
  execute() {
    const versionSplitted = packageInfo.version.split(`.`);
    console.log(`v${versionSplitted[0].red}.${versionSplitted[1].green}.${versionSplitted[0].blue}`);
  }
};
