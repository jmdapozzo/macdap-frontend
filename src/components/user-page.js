import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import UserForm from "./user-form";
import UserTable from "./user-table";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";

function UserPage(props) {
  const { t } = useTranslation(["users", "common"]);
  const [items, setItems] = useState([]);

  const getItems = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/users")
      .then((response) => response.json())
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  };

  const addItemToState = (item) => {
    setItems([...items, item]);
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...items.slice(0, itemIndex),
      item,
      ...items.slice(itemIndex + 1),
    ];
    setItems(newArray);
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <UserTable
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <OverlayTrigger
            placement="top"
            delay="500"
            overlay={<Tooltip>{t("common:buttonLabel.export")}</Tooltip>}
          >
            <CSVLink
              filename={"db.csv"}
              variant="secondary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={items}
            >
              <FaFileDownload />
            </CSVLink>
          </OverlayTrigger>
          <UserForm
            buttonLabel={t("common:buttonLabel.add")}
            addItemToState={addItemToState}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
