import axios from "axios";

const Pow = {
  requestedCount: async () => {
    const result = await axios.get("/pow/requested/count");
    return result.data.count;
  },

  completedCount: async () => {
    const result = await axios.get("/pow/completed/count");
    return result.data.count;
  },
};

export default Pow;
