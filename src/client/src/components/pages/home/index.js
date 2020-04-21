import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import Card from "../../utils/Card";
import Service from "../../../service";

const Home = (props) => {
  const [miners, setMiners] = useState(0);
  const [requested, setRequested] = useState(0);
  const [completed, setCompleted] = useState(0);

  // Set the miner count.
  useEffect(() => {
    const interval = setInterval(() => {
      Service.stats
        .stats()
        .then((stats) => {
          setMiners(stats.minerCount);
          setRequested(stats.requestedCount);
          setCompleted(stats.completedCount);
        })
        .catch(console.error);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Row>
      <Col md="3">
        <Card title="Miners" text={miners} />
      </Col>
      <Col md="3">
        <Card title="POW requested" text={requested} />
      </Col>
      <Col md="3">
        <Card title="POW completed" text={completed} />
      </Col>
      <Col md="3">
        <Card title="Uptime" text="0" />
      </Col>
    </Row>
  );
};

export default Home;
