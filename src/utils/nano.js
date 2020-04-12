import { wallet } from "nanocurrency-web";

const Nano = {
  createAccount: () => {
    return wallet.generate();
  },
};

export default Nano;
