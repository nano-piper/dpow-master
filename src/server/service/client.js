const crypto = require("crypto");
const NanoJS = require("nanocurrency-web/dist/lib/nano-address").default;

const db = require("../db");

const nanoJS = new NanoJS();

const Client = {
  all: async () => {
    return await db.client.all();
  },

  add: async ({ nano, pubKey, signature }) => {
    // Validate the inputs.
    if (!nanoJS.validateNanoAddress(nano)) {
      throw new Error("Not a valid nano address");
    }

    // Format the key in the PEM form.
    const start = '-----BEGIN PUBLIC KEY-----\n';
    const stop = '\n-----END PUBLIC KEY-----';
    const key = `${start}${pubKey}${stop}`;

    const msg = Buffer.from(nano);
    const sig = Buffer.from(signature, "hex");
    const verify = crypto.verify(null, msg, key, sig);
    if (!verify) {
      throw new Error("Not a valid signature");
    }

    return await db.client.add({ nano });
  },

  get: async ({ nano }) => {
    // Validate the inputs.
    if (!nanoJS.validateNanoAddress(nano)) {
      throw new Error("Not a valid nano address");
    }

    return await db.client.get({ nano });
  }
};

module.exports = Client;
