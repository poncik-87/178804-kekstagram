const assert = require(`assert`);
const request = require(`supertest`);
const {app} = require(`../src/server`);

const {generateEntity} = require(`../src/entity-generator`);

const isValidPost = (post) => {
  return ![`url`, `scale`, `effect`, `hashtags`, `description`, `likes`, `comments`, `date`]
      .some((field) => !post.hasOwnProperty(field));
};

const isArrayOfVilidPosts = (posts) => {
  return !posts.some((post) => !isValidPost(post));
};

describe(`get api/posts?skip=0&limit=5`, () => {
  it(`should return paginated posts`, () => {
    request(app)
        .get(`/api/posts`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          const posts = res.body;

          assert.ok(Array.isArray(posts));
          assert.ok(posts.length === 0 || isArrayOfVilidPosts(posts));
        });
  });
});

describe(`get api/posts/:date`, () => {
  it(`should return empty object or post with same date`, () => {
    const date = new Date();
    request(app)
        .get(`/api/posts/${date.getTime()}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          const post = res.body;

          assert.ok(!post || Object.keys(post).length === 0 || isValidPost(post));
        });
  });
});

describe(`post api/posts`, () => {
  it(`should consume JSON`, () => {
    const post = generateEntity();

    return request(app).post(`/api/posts`).
        send(post).
        expect(200, post);
  });

  it(`should consume multiform`, () => {
    return request(app).post(`/api/posts`).
        field(`url`, `funny-cat.png`).
        field(`scale`, `100`).
        field(`description`, `best cat`).
        expect(200, {
          url: `funny-cat.png`,
          scale: `100`,
          description: `best cat`
        });
  });
});
