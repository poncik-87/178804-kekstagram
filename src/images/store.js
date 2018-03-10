const {database} = require(`../database`);
const mongodb = require(`mongodb`);

class ImageStore {
  async getBucket() {
    if (this._bucket) {
      return this._bucket;
    }

    const db = await database;
    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(db, {bucketName: `posts`});
    }

    return this._bucket;
  }

  async getImage(filename) {
    const bucket = await this.getBucket();
    const result = (await bucket.find({filename}).toArray())[0];

    return result ? bucket.openDownloadStreamByName(filename) : null;
  }

  async saveImage(filename, stream) {
    const bucket = await this.getBucket();
    return new Promise((success, fail) => {
      stream.pipe(bucket.openUploadStream(filename))
          .on(`error`, fail)
          .on(`finish`, success);
    });
  }
}

module.exports = {
  name: `postsStore`,
  description: `хранилище картинок в бд`,
  imageStore: new ImageStore()
};
