const entityGeneratorQuestioning = require(`./entity-generator-questioning`);

module.exports = {
  description: `Показывает сообщение при пустых параметрах`,
  execute() {
    entityGeneratorQuestioning.execute();
  }
};
