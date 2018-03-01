const assert = require(`assert`);
const promisify = require(`util`).promisify;
const fs = require(`fs`);

const {generateDataToFile} = require(`../src/cli/entity-generator-questioning`);

const readFilePromise = promisify(fs.readFile);
const unlinkPromise = promisify(fs.unlink);

// Проверяет, что все поля в объекте данных присутствуют
const checkFieldsExists = (dataItem) => {
  assert.ok(
      dataItem.url &&
      dataItem.scale &&
      dataItem.effect &&
      dataItem.hashtags &&
      dataItem.description &&
      dataItem.likes &&
      dataItem.comments
  );
};

describe(`Check generateDataToFile`, () => {
  describe(`Check module contains function`, () => {
    const path = `./blabla`;
    const dataLength = 2;
    let data;

    before(async () => {
      await generateDataToFile(dataLength, path);
      data = JSON.parse(await readFilePromise(path));
    });

    after(async () => {
      await unlinkPromise(path);
    });

    it(`Should write data to file with 2 elements`, () => {
      assert.equal(data.length, dataLength);
    });

    it(`Should write data to file with valid fields`, () => {
      data.forEach(checkFieldsExists);
    });
  });
});
