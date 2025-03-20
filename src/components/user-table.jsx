import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import "moment/locale/fr";
import UserForm from "./user-form";

function UserTable(props) {
  const { t } = useTranslation(["user", "common"]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleEditUser = (index) => {
    setSelectedUserIndex(index);
    setShow(true);
  };

  const handleDeleteUser = (id) => {
    let confirmDelete = window.confirm(
      t("common:alertMsg.areYouSureDeleteItem")
    );
    if (confirmDelete) {
      props.deleteUser(id);
    }
  };

  return (
    <div>
      <Table responsive hover striped bordered size="sm">
        <thead>
          <tr>
            <th> {t("fieldLabel.name")} </th>
            <th> {t("fieldLabel.email")} </th>
            <th> {t("fieldLabel.phone_number")} </th>
            <th> {t("fieldLabel.last_login")} </th>
            <th>{t("fieldLabel.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={user.id}>
              <td> {user.username} </td>
              <td> {user.email} </td>
              <td> {user.phone_number} </td>
              <td>
                {moment
                  .duration(moment(user.last_login).diff(moment()))
                  .locale(navigator.language)
                  .humanize(true)}
              </td>
              <td>
                <div>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>{t("common:buttonLabel.edit")}</Tooltip>}
                  >
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <FaUserEdit />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>{t("common:buttonLabel.delete")}</Tooltip>
                    }
                  >
                    <Button
                      variant="success"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </OverlayTrigger>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show ? (
        <UserForm
          show={show}
          handleClose={handleClose}
          users={props.users}
          selectedUserIndex={selectedUserIndex}
        />
      ) : null}
    </div>
  );
}

export default UserTable;
