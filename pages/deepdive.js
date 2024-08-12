"use client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Graph from "react-graph-vis";
import Combobox from "react-widgets/Combobox";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import GSKNavbar from "@/components/Navbar";
import DeepdiveModal from "@/components/DeepdiveModal";
import { GSKNode, options } from "@/utils/graph";
import Summary from "@/components/Summary";
import Checkbox from "react-custom-checkbox";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import Labels from "@/components/Labels";
import { BoxPlotChart } from "@/components/BoxPlotChart";
import { getAll } from "@/utils/resources";
import { Accordion } from "react-bootstrap";

export default function Deepdive() {
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });
  const [responseGraph, setResponseGraph] = useState({
    nodes: [],
    edges: [],
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allowedCountries, setAllowedCountries] = useState([]);
  const [selectedOrgType, setOrgType] = useState("HCO");
  const [searchLabel, setSearchLabel] = useState("Enter minimum 3 letters.");
  const [HCPCount, setHCPCount] = useState(0);
  const [HCOCount, setHCOCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [hydrated, setHydrated] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [network, setNetwork] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [connection, setConnection] = useState(null);
  const [link, setLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState([0, 0]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const baseUrl = process.env.API_URL;

  const events = {
    doubleClick: ({ nodes, edges }) => {
      if (nodes.length !== 0) {
        setSelectedNode(nodes);
        handleShow();
      } else {
        setSelectedNode(null);
      }
    },
  };

  const countryMap = {
    Spain: "spain",
    Brazil: "brazil",
    "United States of America": "usa",
  };

  const orgMap = {
    HCO: "hco",
    HCP: "hcp",
    "HCO & HCP": "both",
  };

  const countSummaryStats = (graph) => {
    setHCPCount(
      graph.nodes.reduce(
        (counter, { color }) => (color == "#95c0f9" ? counter + 1 : counter),
        0
      )
    );
    setHCOCount(
      graph.nodes.reduce(
        (counter, { color }) => (color == "#fb7e81" ? counter + 1 : counter),
        0
      )
    );
    setConnectionCount(graph.edges.reduce((counter, edge) => counter + 1, 0));
  };

  const handleCountryChange = (country) => {
    setIsLoading(true);
    getAll(
      `/api/v1/deepdive/graph/country?country=${countryMap[country]}&connection=${connection}&min=null&max=null&orgType=${orgMap[selectedOrgType]}&link=${link}`
    )
      .then((res) => {
        setResponseGraph(res.data.data.graph);
        setGraph(res.data.data.graph);
        setMax(res.data.data.graph.price_range[1]);
        setMin(res.data.data.graph.price_range[0]);
        setValue([
          res.data.data.graph.price_range[0],
          res.data.data.graph.price_range[1],
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSelectedCountry(country);
  };

  const handleOrgTypeChange = (orgType) => {
    setOrgType(orgType);
  };

  const handleQueryChange = (e) => {
    let query = e.target.value;
    let searchedGraphItems = [];
    if (query.length > 2) {
      searchedGraphItems = responseGraph.nodes.filter((node) => {
        return node.label.toLowerCase().includes(query.toLowerCase());
      });
      if (searchedGraphItems.length < 40) {
        setSearchLabel(`Found ${searchedGraphItems.length} items.`);
        setGraph((prevState) => {
          return { ...prevState, nodes: [...searchedGraphItems, GSKNode] };
        });
      } else if (searchedGraphItems.length > 40) {
        setSearchLabel(
          `Found ${searchedGraphItems.length} items, narrow down search to render on graph.`
        );
      }
    }
    if (query.length === 0) {
      setSearchLabel("Enter minimum 3 letters.");
      setGraph(responseGraph);
    }
  };

  const handlePriceRangeChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getAll(
      `/api/v1/deepdive/graph/country?country=${countryMap[selectedCountry]}&connection=${connection}&min=${value[0]}&max=${value[1]}&orgType=${orgMap[selectedOrgType]}&link=${link}`
    )
      .then((res) => {
        setResponseGraph(res.data.data.graph);
        setGraph(res.data.data.graph);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getAll("/api/v1/deepdive/graph/user")
      .then((res) => {
        setAllowedCountries(res.data.data.map(({ name }) => name));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setHydrated(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAll(
      `/api/v1/deepdive/graph/country?country=${countryMap[selectedCountry]}&connection=${connection}&min=${value[0]}&max=${value[1]}&orgType=${orgMap[selectedOrgType]}&link=${link}`
    )
      .then((res) => {
        setResponseGraph(res.data.data.graph);
        setGraph(res.data.data.graph);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [connection, link, selectedOrgType]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, [graph]);

  useEffect(() => {
    if (network) {
      network.moveTo({
        scale: 0.1, // Zooms out; 1 is no zoom
      });
    }
  }, [network]);

  useEffect(() => {
    countSummaryStats(graph);
  }, [graph || country]);

  return (
    <>
      <GSKNavbar />
      <DeepdiveModal
        handleClose={handleClose}
        show={show}
        nodeSelected={selectedNode}
      />
      <Row className="p-4">
        <Col xs={4}>
          Select By Country
          <Combobox
            defaultValue={allowedCountries[0]}
            data={allowedCountries}
            onChange={(e) => handleCountryChange(e)}
          />
        </Col>
        <Col xs={2}>
          Filter By
          <Combobox
            defaultValue="HCO"
            data={["HCO & HCP", "HCO", "HCP"]}
            onChange={(e) => handleOrgTypeChange(e)}
          />
        </Col>
        <Col xs={6}>
          Search By
          <Form.Control
            type="text"
            id="searchField"
            onChange={(e) => handleQueryChange(e)}
          />
          <Form.Text id="searchTextField" muted>
            {searchLabel}
          </Form.Text>
        </Col>
      </Row>
      <Row>
        <Summary
          HCOCount={HCOCount}
          HCPCount={HCPCount}
          connectionCount={connectionCount}
        />
      </Row>
      <Row>
        <Col xs={3}>
          <PriceRangeFilter
            handlePriceRangeChange={handlePriceRangeChange}
            setValue={setValue}
            selectedCountry={selectedCountry}
            min={min}
            max={max}
            value={value}
          />
          <Accordion className="m-5">
            <Accordion.Item eventKey="0">
              <Accordion.Header>More filters</Accordion.Header>
              <Accordion.Body>
                <div className="p-2">
                  <Checkbox
                    checked={isChecked}
                    onChange={(value, event) => {
                      if (value) setConnection("weak");
                      if (!value) setConnection(null);
                    }}
                    label="Show additional connections"
                  />
                </div>
                <div className="p-2">
                  <Checkbox
                    checked={isChecked}
                    onChange={(value, event) => {
                      if (value) setLink("negative");
                      if (!value) setLink(null);
                    }}
                    label="Show negative news"
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs={9}>
          {isLoading && <div id="loading-overlay"></div>}
          {hydrated && (
            <>
              <Graph
                graph={graph}
                options={options}
                events={events}
                style={{ height: "85vh", zIndex: "50" }}
                getNetwork={(network) => {
                  setNetwork(network);
                }}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
