const blake2 = require("blake2");

const Pow = {
  powThrehold: (buf) => {
    const threshold = Buffer.from("ffffffc000000000", "hex");
    return Buffer.compare(buf, threshold) >= 0;
  },

  powValidate: async (pow, hash) => {
    const _pow = Buffer.from(pow, "hex");
    _pow.reverse();

    const h = blake2.createHash("blake2b", { digestLength: 8 });
    h.update(_pow);
    h.update(Buffer.from(hash, "hex"));

    const final = h.digest();
    final.reverse();

    return Pow.powThrehold(final);
  },
};

module.exports = Pow;
