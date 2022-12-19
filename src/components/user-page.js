import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import UserTable from "./user-table";

function UserPage(props) {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState({ hasError: false });

  const { getAccessTokenSilently } = useAuth0();
  const deleteUser = (id) => {
    window.confirm(`Deleting user with id ${id}`);
    const updatedItems = users.filter((user) => user.user_id !== id);
    setUsers(updatedItems);
    /*
      fetch(process.env.REACT_APP_SERVER_URL + "/users", {
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
        const token = await getAccessTokenSilently();

        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/management/user/v2",
          {
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
  }, [getAccessTokenSilently]);

  return (
    <Container fluid>
      <Row>
        <Col>
          {!result.hasError ? (
            <UserTable users={users} deleteUser={deleteUser} />
          ) : (
            <Alert variant="danger"> {result.message} </Alert>
          )}{" "}
        </Col>{" "}
      </Row>{" "}
    </Container>
  );
}

export default UserPage;
