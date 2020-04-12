const url = require("url");
const MongoClient = require("mongodb").MongoClient;

const DB = {
  db: null,

  getDB: async () => {
    if (!DB.db) {
      const uri = process.env.MONGODB_URI;
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      DB.db = await client.db(url.parse(uri).pathname.substr(1));
    }

    return DB.db;
  },

  client: {
    collection: "clients",

    all: async () => {
      const db = await DB.getDB();
      const collection = await db.collection(DB.client.collection);

      return await collection.find({}).toArray();
    },

    add: async ({ ip, nano }) => {
      const db = await DB.getDB();
      const collection = await db.collection(DB.client.collection);

      const date = new Date().toISOString();

      return await collection.insertOne({
        ip,
        nano,
        mined: 0,
        last: `${date.substr(0, 10)} ${date.substr(11, 8)}`
      });
    }
  },
};

module.exports = DB;
