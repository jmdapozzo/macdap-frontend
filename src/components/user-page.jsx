import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "./loading";
import { Container, Row, Col, Alert } from "react-bootstrap";
import UserTable from "./user-table";

function UserPage(props) {
  const { keycloak } = useKeycloak();
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState({ hasError: false });
  
  const deleteUser = (id) => {
    const token = keycloak.token;
    const updatedItems = users.filter((user) => user.id !== id);
    setUsers(updatedItems);
    fetch(process.env.REACT_APP_KEYCLOAK_URL + "/admin/realms/" + process.env.REACT_APP_KEYCLOAK_REALM + "/users/" + id, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = keycloak.token;

        const response = await fetch(
          process.env.REACT_APP_KEYCLOAK_URL + "/admin/realms/" + process.env.REACT_APP_KEYCLOAK_REALM + "/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        setUsers(responseData);
      } catch (error) {
        setResult({ hasError: true, message: error.message });
        }
    };

    getUsers();
  }, [keycloak]);

  if (!users) {
    <Loading />;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? (
            <UserTable users={users} deleteUser={deleteUser} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}
          {/* <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(users, null, 2)}
          </pre> */}
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
