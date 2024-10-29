import { Col, Row } from "react-bootstrap";
import { LineChart } from "./LineChart";

export default function Financials() {
  return (
    <>
      <Row>
        <Col>
          <div className="p-4">
            <h5>Chart 1</h5>
          </div>
          <LineChart />
        </Col>
        <Col>
          <div className="p-4">
            <h5>Chart 2</h5>
          </div>
          <LineChart />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-4">
            <h5>Chart 3</h5>
          </div>
          <LineChart />
        </Col>
        <Col>
          <div className="p-4">
            <h5>Chart 4</h5>
          </div>
          <LineChart />
        </Col>
      </Row>
    </>
  );
}
