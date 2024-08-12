"use client";
import GSKNavbar from "@/components/Navbar";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Multiselect from "react-widgets/Multiselect";
import Combobox from "react-widgets/Combobox";
import { Badge, Button } from "react-bootstrap";
import { PersonAdd } from "react-bootstrap-icons";
import { useState } from "react";

const { SearchBar } = Search;

const activeUserFormatter = (cell, row) => {
  if (row.isActive) {
    return <Badge bg="success">Active</Badge>;
  } else {
    return <Badge bg="danger">Inactive</Badge>;
  }
};

const countryFormatter = (cell, row) => {
  return cell.join(", ");
};

const columns = [
  {
    dataField: "username",
    text: "Username",
  },
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "email",
    text: "Email",
  },
  {
    dataField: "country",
    text: "Country",
    formatter: countryFormatter,
  },
  {
    dataField: "isActive",
    text: "Active",
    formatter: activeUserFormatter,
  },
  {
    dataField: "type",
    text: "User Type",
  },
  {
    dataField: "createdOn",
    text: "Created On",
  },
  {
    dataField: "lastLoggedIn",
    text: "Last Logged In",
  },
];

const data = [
  {
    id: "1",
    username: "sumanthnk_",
    name: "Summanth",
    email: "summanthnk@ey.in",
    country: ["United States of America", "Brazil"],
    isActive: true,
    type: "User",
    createdOn: new Date().toDateString(),
    lastLoggedIn: new Date().toDateString(),
  },
  {
    id: "2",
    username: "ansh.",
    name: "Ansh .",
    email: "ansh@ey.in",
    country: ["Brazil", "Spain"],
    isActive: false,
    type: "User",
    createdOn: new Date().toDateString(),
    lastLoggedIn: new Date().toDateString(),
  },
];

export default function Home() {
  const [rows, setRows] = useState(data);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCountries, setNewCountries] = useState([]);
  const [newIsActive, setNewIsActive] = useState("");
  const [newType, setNewType] = useState("User");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [isActive, setIsActive] = useState("");
  const [type, setType] = useState("");

  const handleUserModalClose = () => setShowUserModal(false);
  const handleUserModalShow = () => setShowUserModal(true);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const updateUser = () => {};
  const deleteUser = () => {};
  const createUser = () => {};

  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <>
        {setCountries(row.countries)}
        <Row xs={6} className="justify-content-md-center">
          <Col>
            <Form.Label muted>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={row.name}
              onChange={(e) => setName(e)}
            />
          </Col>
          <Col>
            <Form.Label muted>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder={row.email}
              onChange={(e) => setEmail(e)}
            />
          </Col>
        </Row>
        <Row xs={6} className="justify-content-md-center pt-3">
          <Col>
            <Form.Label muted>Activate User</Form.Label>
            <Combobox
              placeholder={String(row.isActive)}
              data={["true", "false"]}
              onChange={(e) => setIsActive(e)}
            />
          </Col>
          <Col>
            <Form.Label muted>User Type</Form.Label>
            <Combobox
              placeholder={row.type}
              data={["User", "Admin"]}
              onChange={(e) => setType(e)}
            />
          </Col>
        </Row>
        {type === "User" && (
          <Row xs={6} className="justify-content-md-center pt-3">
            <Col xs={4}>
              <Form.Label muted>Select Country or Countries</Form.Label>
              <Multiselect
                defaultValue={row.country}
                data={["United States of America", "Brazil", "Spain"]}
                onChange={(e) => setCountries(e)}
              />
            </Col>
          </Row>
        )}
        <Row xs={6} className="justify-content-md-center pt-4">
          <Col className="d-flex justify-content-start">
            <Button>Update</Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="btn-secondary text-white"
              onClick={() => {
                setSelectedUserId(row);
                handleDeleteModalShow();
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </>
    ),
  };
  return (
    <>
      <GSKNavbar />
      <Row>
        {/* modal to add users */}
        <Modal
          show={showUserModal}
          onHide={handleUserModalClose}
          animation={true}
        >
          <Modal.Body>
            <Row xs={12} className="justify-content-md-center">
              <Col>
                <Form.Label muted>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label muted>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Col>
            </Row>
            <Row xs={12} className="justify-content-md-center pt-3">
              <Col>
                <Form.Label muted>Activate User</Form.Label>
                <Combobox
                  data={["true", "false"]}
                  onChange={(e) => setNewIsActive(e)}
                />
              </Col>
              <Col>
                <Form.Label muted>User Type</Form.Label>
                <Combobox
                  defaultValue={newType}
                  data={["User", "Admin"]}
                  onChange={(e) => setNewType(e)}
                />
              </Col>
            </Row>
            {newType === "User" && (
              <Row xs={12} className="justify-content-md-center pt-3">
                <Col xs={12}>
                  <Form.Label muted>Select Country or Countries</Form.Label>
                  <Multiselect
                    data={["United States of America", "Brazil", "Spain"]}
                    onChange={(e) => setNewCountries(e)}
                  />
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUserModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUserModalClose}>
              Add User
            </Button>
          </Modal.Footer>
        </Modal>
        {/* confirm delete modal */}
        <Modal
          show={showDeleteModal}
          onHide={handleDeleteModalClose}
          animation={false}
        >
          <Modal.Body>
            <Row>
              <Col>
                {`Are you sure you want to delete ${selectedUserId.name} with email ${selectedUserId.email}`}
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Button variant="secondary text-white">Delete User</Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        {/* table and search component */}
        <Col className="p-5">
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <>
                <Row className="pb-2">
                  <Col>
                    <SearchBar {...props.searchProps} />
                  </Col>
                  <Col xs={9}></Col>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={handleUserModalShow}
                    >
                      <PersonAdd />
                      {` `}Add user
                    </Button>
                  </Col>
                </Row>
                <BootstrapTable {...props.baseProps} expandRow={expandRow} />
              </>
            )}
          </ToolkitProvider>
        </Col>
      </Row>
    </>
  );
}
