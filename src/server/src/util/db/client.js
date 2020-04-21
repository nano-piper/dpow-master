module.exports = (getCollection) => {
  const result = {
    collection: "clients",
  };

  result.all = async () => {
    const collection = await getCollection(result.collection);
    return await collection.find({}).toArray();
  };

  result.count = async () => {
    const collection = await getCollection(result.collection);
    return collection.count();
  };

  result.add = async ({ nano }) => {
    const collection = await getCollection(result.collection);

    const date = new Date().toISOString();

    return await collection.insertOne({
      nano,
      mined: "0",
      last: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
    });
  };

  result.get = async ({ nano }) => {
    const collection = await getCollection(result.collection);
    return await collection.find({ nano }).toArray();
  };

  return result;
};
