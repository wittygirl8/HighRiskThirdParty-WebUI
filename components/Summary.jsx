"use client";

import { Badge } from "react-bootstrap";

export default function Summary({ HCPCount, HCOCount, connectionCount }) {
  return (
    <>
      <div className="d-flex flex-row-reverse my-auto">
        <div className="mt-0 mx-4">
          <h6 className="fw-bold">
            TOTAL HCP <Badge bg="secondary">{HCPCount}</Badge>
          </h6>
        </div>
        <div className="mt-0 mx-5">
          <h6 className="fw-bold">
            TOTAL HCO <Badge bg="secondary">{HCOCount}</Badge>
          </h6>
        </div>
        <div className="mt-0 mx-5">
          <h6 className="fw-bold">
            TOTAL NUMBER OF CONNECTIONS{" "}
            <Badge bg="secondary">{connectionCount}</Badge>
          </h6>
        </div>
      </div>
    </>
  );
}
