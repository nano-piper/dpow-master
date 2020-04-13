module.exports = (getCollection) => {
  return {
    collection: "clients",

    all: async () => {
      const collection = await getCollection(this.collection);
      return await collection.find({}).toArray();
    },

    add: async ({ nano }) => {
      const collection = await getCollection(this.collection);

      const date = new Date().toISOString();

      return await collection.insertOne({
        nano,
        mined: "0",
        last: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      });
    },

    get: async ({ nano }) => {
      const collection = await getCollection(this.collection);
      return await collection.find({ nano }).toArray();
    },
  };
};
