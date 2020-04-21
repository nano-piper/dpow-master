module.exports = (getCollection) => {
  const result = {
    collection: "pow",
  };

  result.get = async ({ blockHash }) => {
    const collection = await getCollection(result.collection);
    return await collection.find({ blockHash }).toArray();
  };

  result.watch = ({ blockHash }) => {
    return new Promise((resolve, reject) => {
      getCollection(result.collection).then((collection) => {
        const match = {
          $match: {
            blockHash,
            $and: [
              { "updateDescription.updatedFields.pow": { $exists: true } },
              { operationType: "update" },
            ],
          },
        };

        const filter = { fullDocument: "updateLookup" };

        collection
          .watch([match], filter)
          .on("change", resolve)
          .on("error", reject);
      });
    });
  };

  result.add = async ({ blockHash, nano }) => {
    const collection = await getCollection(result.collection);

    const date = new Date().toISOString();

    return await collection.insertOne({
      blockHash,
      nano,
      created: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
    });
  };

  result.update = async ({ blockHash, miner, pow }) => {
    const collection = await getCollection(result.collection);

    const date = new Date().toISOString();

    return await collection.updateOne(
      {
        blockHash,
      },
      {
        miner,
        pow,
        modified: `${date.substr(0, 10)} ${date.substr(11, 8)}`,
      }
    );
  };

  result.requestedCount = async () => {
    const collection = await getCollection(result.collection);
    return collection.count();
  };

  result.completedCount = async () => {
    const collection = await getCollection(result.collection);
    return collection.find({ pow: { $exists: true } }).count();
  };

  return result;
};
