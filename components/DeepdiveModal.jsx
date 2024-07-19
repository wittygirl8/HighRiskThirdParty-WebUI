"use client";

import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import EventTimeline from "./EventTimeline";
import Overview from "./Overview";
import Graph from "react-graph-vis";
import Chronology from "./Chronology";
import { options } from "../utils/subGraph";
import { getAll } from "../utils/resources";

function DeepdiveModal({ show, nodeSelected, handleClose }) {
  const [selectedNode, setSelectedNode] = useState();
  const [hydrated, setHydrated] = useState(null);
  const baseUrl = process.env.API_URL;
  const [overviewData, setOveriewData] = useState({});
  const [eventTimelineData, setEventTimelineData] = useState([]);
  const [chronologyData, setChronologyData] = useState([]);
  const [subGraph, setSubGraph] = useState({
    nodes: [],
    edges: [],
  });

  const events = {
    doubleClick: ({ nodes, edges }) => {
      if (nodes.length !== 0) {
        setSelectedNode(nodes);
      } else {
        setSelectedNode(null);
      }
    },
  };

  useEffect(() => {
    setHydrated(true);
    // subGraph
    if (nodeSelected) {
      getAll(`api/v1/deepdive/graph/node?id=${nodeSelected}`)
        .then((res) => {
          setSubGraph(res.data.data.graph);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // overview
      getAll(`api/v1/deepdive/overview?id=${nodeSelected}`)
        .then((res) => {
          setOveriewData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // external events data
      getAll(`api/v1/deepdive/ext_events?id=${nodeSelected}`)
        .then((res) => {
          setEventTimelineData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // timeline data
      getAll(`api/v1/deepdive/timeline?id=${nodeSelected}`)
        .then((res) => {
          setChronologyData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [nodeSelected]);

  useEffect(() => {
    if (selectedNode) {
      getAll(`api/v1/deepdive/graph/node?id=${selectedNode}`)
        .then((res) => {
          setSubGraph(res.data.data.graph);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // overview
      getAll(`api/v1/deepdive/overview?id=${selectedNode}`)
        .then((res) => {
          setOveriewData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // external events data
      getAll(`api/v1/deepdive/ext_events?id=${selectedNode}`)
        .then((res) => {
          setEventTimelineData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // timeline data
      getAll(`api/v1/deepdive/timeline?id=${selectedNode}`)
        .then((res) => {
          setChronologyData(res.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedNode]);

  return (
    <>
      {nodeSelected && (
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Body>
            <Tabs
              defaultActiveKey="network"
              id="fill-tab-example"
              fill
              variant="pills"
              justify={true}
            >
              <Tab eventKey="network" title="Network">
                <Row>
                  <Col xs={3}>
                    <Overview overviewData={overviewData} />
                  </Col>
                  <Col xs={9}>
                    {hydrated && (
                      <Graph
                        graph={subGraph}
                        options={options}
                        events={events}
                        style={{ height: "50vh" }}
                      />
                    )}
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="external" title="External">
                <Row>
                  <Col>
                    <EventTimeline eventTimelineData={eventTimelineData} />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="timeline" title="Timeline">
                <Row>
                  <Col>
                    <Chronology chronologyData={chronologyData} />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="text-white"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default DeepdiveModal;
