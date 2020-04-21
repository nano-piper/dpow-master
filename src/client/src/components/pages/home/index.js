import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import Request from "./Request";
import EmptyRow from "../../utils/EmptyRow";
import Card from "../../utils/Card";
import Service from "../../../service";
import Timer from "../../utils/Timer";

const Home = (props) => {
  const [miners, setMiners] = useState(0);
  const [requested, setRequested] = useState(0);
  const [completed, setCompleted] = useState(0);

  const header = ["Requestor", "Block", "Time"];
  const body = [
    ["11111111111", "22222222222222", new Date()],
    ["2222", "111111", new Date()],
  ];

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
    <>
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
          <Card title="Uptime" text={<Timer time={new Date()} />} />
        </Col>
      </Row>
      <EmptyRow rows={3} />
      <Row>
        <Col md="6">
          <Request title="POW requested" header={header} body={body} />
        </Col>
        <Col md="6">
          <Request title="POW completed" header={header} body={body} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
