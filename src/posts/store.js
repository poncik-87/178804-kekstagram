const {database} = require(`../database`);

class PostsStore {
  async getPosts() {
    const collection = await this._getCollection();
    return collection.find();
  }

  async getPost(filter) {
    const collection = await this._getCollection();
    return collection.findOne(filter);
  }

  async savePost(post) {
    const collection = await this._getCollection();
    return collection.insertOne(post);
  }

  async _getCollection() {
    if (this._postsCollection) {
      return this._postsCollection;
    }

    const db = await database;
    this._postsCollection = db.collection(`posts`);

    return this._postsCollection;
  }
}

module.exports = {
  name: `postsStore`,
  description: `хранилище постов в бд`,
  postsStore: new PostsStore()
};
