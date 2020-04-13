const blake2 = require("blake2.wasm");

const Pow = {
  ready: () => {
    return new Promise((resolve) => {
      blake2.ready(() => resolve());
    });
  },

  powThrehold: (buf) => {
    const threshold = Buffer.from("ffffffc000000000", "hex");
    return Buffer.compare(buf, threshold) >= 0;
  },

  powValidate: async (pow, hash) => {
    const _pow = Buffer.from(pow, "hex");
    _pow.reverse();

    await Pow.ready();

    const h = blake2.Blake2b(8);
    h.update(_pow);
    h.update(Buffer.from(hash, "hex"));

    const final = h.final();
    final.reverse();

    return Pow.powThrehold(final);
  },
};

module.exports = Pow;
