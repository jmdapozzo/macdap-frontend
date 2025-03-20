import React, { useState, useEffect, use } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "./loading";
import { Container, Row, Col, Alert } from "react-bootstrap";
import UserTable from "./user-table";

function UserPage(props) {
  const { keycloak } = useKeycloak();
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState({ hasError: false });
  
  const deleteUser = (id) => {
    window.confirm(`Deleting user with id ${id}`);
    const updatedItems = users.filter((user) => user.user_id !== id);
    setUsers(updatedItems);
    /*
      fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/users", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          users.deleteItemFromState(id);
        })
        .catch((err) => console.log(err));
        */
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = keycloak.token;

        const response = await fetch(
          process.env.REACT_APP_KEYCLOAK_URL + "/admin/realms/" + process.env.REACT_APP_KEYCLOAK_REALM + "/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        setUsers(responseData);
      } catch (error) {
        // setResult({ hasError: true, message: error.message });
        setUsers("!!!!!" + error.message);
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
        <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(users, null, 2)}
          </pre>

          {/* {!result.hasError ? (
            <UserTable users={users} deleteUser={deleteUser} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )} */}
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
