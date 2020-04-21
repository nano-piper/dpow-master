import React from "react";

import { Row, Col, Table } from "react-bootstrap";

import Timer from "../../utils/Timer";

const Request = ({ title, header, body }) => (
  <>
    <Row>
      <Col>
        <h3>
          <code>{title}</code>
        </h3>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table variant="dark" responsive="md">
          <thead>
            <tr>
              {header.map((head, index) => {
                if (head.length > 15) {
                  return <th key={index}>{head.substr(0, 15)}...</th>;
                } else {
                  return <th key={index}>{head}</th>;
                }
              })}
            </tr>
          </thead>
          <tbody>
            {body.map((row, index) => (
              <tr key={index}>
                {row.map((item, index) => {
                  if (item instanceof Date) {
                    return (
                      <td key={index}>
                        <Timer time={item} />
                      </td>
                    );
                  } else if (item.length > 15) {
                    return <td key={index}>{item.substr(0, 15)}...</td>;
                  } else {
                    return <td key={index}>{item}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </>
);

export default Request;
