const NanoJS = require("nanocurrency-web/dist/lib/nano-address").default;

const DB = require("../util/db");
const Pow = require("../util/pow");

const nanoJS = new NanoJS();

const PowService = {
  get: async ({ blockHash, nano }) => {
    // Validate the inputs.
    if (!nanoJS.validateNanoAddress(nano)) {
      throw new Error("Not a valid nano address");
    }

    // Check if it already exists.
    // If yes, return.
    const results = await DB.pow.get({ blockHash });
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }

    await DB.pow.add({ blockHash, nano });

    // Wait for pow field to be done.
    const _results = await DB.pow.watch({ blockHash });
    if (Array.isArray(_results) && _results.length > 0) {
      return _results[0];
    }
  },

  add: async ({ blockHash, pow, miner }) => {
    // Validate the inputs.
    if (!nanoJS.validateNanoAddress(miner)) {
      throw new Error("Not a valid nano address");
    }

    const validate = await Pow.powValidate(pow, blockHash);
    if (!validate) {
      throw new Error(`Invalid pow for hash: "${blockHash}"`);
    }

    return await DB.pow.update({ blockHash, miner, pow });
  },
};

module.exports = PowService;
