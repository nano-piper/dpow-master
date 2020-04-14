module.exports = (getCollection) => {
  const result = {
    collection: "pow",
  };

  result.add = async ({ blockHash, pow, nano }) => {
    const collection = await getCollection(result.collection);

    const date = new Date().toISOString();

    return await collection.insertOne({
      blockHash,
      pow,
      nano,
      created: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
    });
  };

  return result;
};
