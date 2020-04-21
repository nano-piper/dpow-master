import axios from "axios";

const Miner = {
  count: async () => {
    const result = await axios.get("/client/count");
    return result.data.count;
  },
};

export default Miner;
