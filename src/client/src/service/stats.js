import axios from "axios";

const Stats = {
  stats: async () => {
    const result = await axios.get("/stats");
    return result.data;
  },
};

export default Stats;
