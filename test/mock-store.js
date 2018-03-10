const {generateEntities, hasFilterValues} = require(`../src/utils`);

class ArrayCursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new ArrayCursor(this.data.slice(count));
  }

  limit(count) {
    return new ArrayCursor(this.data.slice(0, count));
  }

  count() {
    return this.data.length;
  }

  toArray() {
    return this.data;
  }
}

class MocPostsStore {
  constructor() {
    this.cursor = new ArrayCursor(generateEntities(50));
  }

  getPosts() {
    return this.cursor;
  }

  getPost(filter) {
    return this.cursor.toArray().find((post) => hasFilterValues(post, filter));
  }

  savePost() {
  }
}

class MocImageStore {
  getImage() {
  }

  saveImage() {
  }
}

module.exports = {
  name: `mockStores`,
  description: `мок классы хранилища`,
  mocPostsStore: new MocPostsStore(),
  mocImageStore: new MocImageStore()
};
