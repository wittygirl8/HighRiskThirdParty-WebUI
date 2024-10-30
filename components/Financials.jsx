import { Col, Row } from "react-bootstrap";
import { LineChart } from "./LineChart";
import { useEffect, useState } from "react";

export default function Financials({ financialData }) {
  const [financialChartData, setFinancialChartData] = useState(financialData);
  const groupedData = [];

  useEffect(() => {
    setFinancialChartData(financialData);
  }, [financialData]);

  for (let i = 0; i < financialChartData.length; i += 2) {
    groupedData.push(financialChartData.slice(i, i + 2));
  }

  return (
    <>
      {groupedData.map((pair) => (
        <Row key={pair[0].title}>
          {pair.map((data) => (
            <Col key={data.title}>
              <div className="p-4">
                <h5>{data.title}</h5>
              </div>
              <LineChart data={data} />
            </Col>
          ))}
          {pair.length === 1 && <Col />}
        </Row>
      ))}
    </>
  );
}
