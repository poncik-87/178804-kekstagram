const assert = require(`assert`);

const {getFilePathByUrl} = require(`../src/server`);

describe(`Check server utils`, () => {
  describe(`Check getFilePathByUrl`, () => {
    it(`Should return path in static folder`, () => {
      const url = `/file.html`;
      const path = `./static${url}`;
      assert.equal(getFilePathByUrl(url), path);
    });

    it(`Should return path in static subfolder`, () => {
      const url = `/subfolder/file.html`;
      const path = `./static${url}`;
      assert.equal(getFilePathByUrl(url), path);
    });

    it(`Should return index.html in static folder for empty url path`, () => {
      const url = `/`;
      const path = `./static/index.html`;
      assert.equal(getFilePathByUrl(url), path);
    });

    it(`Should not go outside static folder`, () => {
      const url = `/subfolder/../../src`;
      const path = `./src`;
      assert.notEqual(getFilePathByUrl(url), path);
    });
  });
});
