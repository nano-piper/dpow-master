module.exports = (getCollection) => {
  return {
    collection: "pow",

    add: async ({ blockHash, pow, nano }) => {
      const collection = await getCollection(this.collection);

      const date = new Date().toISOString();

      return await collection.insertOne({
        blockHash,
        pow,
        nano,
        created: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      });
    },
  };
};
