import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stats from "../../components/Stats";
import GSKNavbar from "../../components/Navbar";
import BootstrapTable from "react-bootstrap-table-next";
import { useEffect, useState } from "react";
import { BarChart } from "../../components/BarChart";
import { Combobox } from "react-widgets";
import { CenteredBarChart } from "../../components/CenteredBarChart";
import DeepdiveModal from "../../components/DeepdiveModal";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { getAll } from "../../utils/resources";

const riskScoreColumns = [
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "riskscore",
    text: "Risk Score",
  },
];

const businessActivityColumns = [
  {
    dataField: "Name",
    text: "Name",
  },
  {
    dataField: "Entertainment",
    text: "Entertainment",
  },
  {
    dataField: "Gifts",
    text: "Gifts",
  },
  {
    dataField: "Membership Fees",
    text: "Membership Fees",
  },
  {
    dataField: "Grants & Donations",
    text: "Grants & Donations",
  },
  {
    dataField: "HCP Fee for Service",
    text: "HCP Fee for Service",
  },
  {
    dataField: "HCP Fee for Service - Travel Expenses",
    text: "HCP Fee for Service - Travel Expenses",
  },
  {
    dataField: "Market Research",
    text: "Market Research",
  },
  {
    dataField: "Other HCO expenditure",
    text: "Other HCO Expenditure",
  },
  {
    dataField: "Sponsorships",
    text: "Sponsorships",
  },
  {
    dataField: "Travel Expenses",
    text: "Travel Expenses",
  },
];

const connectionsTableColumns = [
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "priority",
    text: "Priority",
  },
  {
    dataField: "connection_count",
    text: "Connection Count",
  },
];

const globalSpendColums = [
  {
    dataField: "Name",
    text: "Name",
  },
  {
    dataField: "USA",
    text: "United States of America",
  },
  {
    dataField: "Spain",
    text: "Spain",
  },
  {
    dataField: "Brazil",
    text: "Brazil",
  },
];

export default function Dashboard() {
  const chartObject = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  };
  const [selectedNode, setSelectedNode] = useState(null);
  const [defaultConnectionsTableData, setDefaultConnectionsTableData] = useState(null);
  const [connectionsChartData, setConnectionChartData] = useState(chartObject);
  const [mediaCoverageChartData, setMediaCoverageChartData] =
    useState(chartObject);
  const [selectedOrgType, setOrgType] = useState("HCO");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [statsData, setStatsData] = useState([]);
  const [riskScoreData, setRiskScoreData] = useState([]);
  const [businessActivityData, setBusinessActivityData] = useState([]);
  const [connectionsTableData, setConnectionTableData] = useState([]);
  const [globalSpendData, setGlobalSpendData] = useState([]);
  const [allowedCountries, setAllowedCountries] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const countryMap = {
    Spain: "spain",
    Brazil: "brazil",
    "United States of America": "usa",
    "": null,
  };

  const orgMap = {
    HCO: "hco",
    HCP: "hcp",
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setSelectedNode(row.id);
      handleShow();
    },
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleOrgTypeChange = (orgType) => {
    setOrgType(orgType);
  };

  useEffect(() => {
    getAll(
      `/api/v1/scorecard/dashboard/stats?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setStatsData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/riskTable?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setRiskScoreData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/businessActivities?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setBusinessActivityData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/connectionsTable?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setConnectionTableData(res.data.data.slice(0, 5));
        setDefaultConnectionsTableData(res.data.data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/globalSpend?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setGlobalSpendData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/mediaCoverage?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setMediaCoverageChartData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAll(
      `/api/v1/scorecard/dashboard/connections?country=${countryMap[selectedCountry]}&orgType=${orgMap[selectedOrgType]}`
    )
      .then((res) => {
        setConnectionChartData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedCountry, selectedOrgType]);

  const handleBarClick = (priority) => {
    priority ? setConnectionTableData(defaultConnectionsTableData.filter(d => d.priority === priority).slice(0, 5)) : setConnectionTableData(defaultConnectionsTableData.slice(0, 5));
  };

  const mediaBarClick = (id) => {
    console.log(id);
    setSelectedNode(id);
     handleShow();
  };

  useEffect(() => {
    getAll("/api/v1/deepdive/graph/user")
      .then((res) => {
        setAllowedCountries(res.data.data.map(({ name }) => name));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <GSKNavbar />
      <DeepdiveModal
        handleClose={handleClose}
        show={show}
        nodeSelected={selectedNode}
      />
      <Row>
        <Col xs={4} className="ps-5 pt-2">
          Select By Country
          <Combobox
            defaultValue={allowedCountries[0]}
            data={allowedCountries}
            onChange={(e) => handleCountryChange(e)}
          />
        </Col>
        <Col xs={2} className="ps-2 pt-2">
          Filter By
          <Combobox
            defaultValue="HCO"
            data={["HCO", "HCP"]}
            onChange={(e) => handleOrgTypeChange(e)}
          />
        </Col>
      </Row>
      <Row className="ps-5">
        <Stats data={statsData} />
      </Row>
      <Row>
        <Col>
          <div className="p-5">
            <h5>Top 5 HCO's by risk score</h5>
            <BootstrapTable
              keyField="id"
              data={riskScoreData}
              columns={riskScoreColumns}
              rowEvents={rowEvents}
            />
          </div>
        </Col>
        <Col>
          <div className="pt-5">
            <Row>
              <Col xs={6}>
                <h5 className="pb-1">Media Coverage</h5>
                <CenteredBarChart
                  mediaCoverageChartData={mediaCoverageChartData} onBarClick={mediaBarClick}
                />
              </Col>
              <Col xs={6}>
                <h5 className="pb-1">Connections</h5>
                <BarChart connectionsChartData={connectionsChartData} onBarClick={handleBarClick}/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-5">
            <h5>HCO's with global spend</h5>
            <BootstrapTable
              keyField="id"
              data={globalSpendData}
              columns={globalSpendColums}
              rowEvents={rowEvents}
            />
          </div>
        </Col>
        <Col>
          <div className="p-5">
            <h5>Top 5 HCO's by connections</h5>
            <BootstrapTable
              keyField="id"
              data={connectionsTableData}
              columns={connectionsTableColumns}
              rowEvents={rowEvents}
            />
          </div>
        </Col>
        <Row>
          <Col>
            <div className="p-5">
              <h5>Top HCO's with Payment across Business Activities</h5>
              <BootstrapTable
                keyField="id"
                data={businessActivityData}
                columns={businessActivityColumns}
                rowEvents={rowEvents}
              />
            </div>
          </Col>
        </Row>
      </Row>
    </>
  );
}
