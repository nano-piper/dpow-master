const NanoJS = require("nanocurrency-web/dist/lib/nano-address").default;

const DB = require("../util/db");
const Pow = require("../util/pow");

const nanoJS = new NanoJS();

const PowService = {
  add: async ({ blockHash, pow, nano }) => {
    // Validate the inputs.
    if (!nanoJS.validateNanoAddress(nano)) {
      throw new Error("Not a valid nano address");
    }

    const validate = await Pow.powValidate(pow, blockHash);
    if (!validate) {
      throw new Error(`Invalid pow for ${blockHash}`);
    }

    return await DB.pow.add({ blockHash, pow, nano });
  },
};

module.exports = PowService;
