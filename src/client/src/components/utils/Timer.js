import React, { useEffect, useState } from "react";

import Moment from "./Moment";

const Timer = (props) => {
  const [time] = useState(props.time);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    console.log("hello");
    const id = setInterval(() => setTimeStr(Moment(time).fromNow()), 1000);

    return () => clearInterval(id);
  }, [time]);

  return <span>{timeStr}</span>;
};

export default Timer;
