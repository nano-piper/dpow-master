const url = require("url");
const MongoClient = require("mongodb").MongoClient;

const DB = {
  db: null,

  getCollection: async (collection) => {
    if (!DB.db) {
      const uri = process.env.MONGODB_URI;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      DB.db = await client.db(url.parse(uri).pathname.substr(1));
    }

    return await DB.db.connection(collection);
  },
};

DB.pow = require("./pow")(DB.getCollection);
DB.client = require("./client")(DB.getCollection);

module.exports = DB;
