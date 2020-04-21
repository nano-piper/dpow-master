import React from "react";

import { Card } from "react-bootstrap";

const NCard = ({ title, text }) => (
  <Card
    style={{
      border: "4px solid #61dafb",
      borderRadius: "5px",
      background: "#61dafb",
    }}
  >
    <Card.Header
      as="h6"
      style={{
        textTransform: "uppercase",
      }}
    >
      {title}
    </Card.Header>
    <Card.Body>
      <Card.Text
        style={{
          color: "#282c34",
          fontSize: "2rem",
        }}
      >
        {text}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default NCard;
