import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import { DateTime, Duration } from "luxon";
import UserForm from "./user-form";

function UserTable({ users }) {
  const { t } = useTranslation(["user", "common"]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOnRowClick = (index) => {
    setSelectedUserIndex(index);
    setShow(true);
  };

  return (
    <div>
      <Table responsive hover striped bordered size="sm">
        <thead>
          <tr>
            <th> {t("fieldLabel.family_name")} </th>
            <th> {t("fieldLabel.given_name")} </th>
            <th> {t("fieldLabel.email")} </th>
            <th> {t("fieldLabel.phone_number")} </th>
            <th> {t("fieldLabel.last_login")} </th>
            <th> Test </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id} onClick={() => handleOnRowClick(index)}>
              <td> {user.family_name} </td>
              <td> {user.given_name} </td>
              <td> {user.email} </td>
              <td> {user.phone_number} </td>
              <td> {DateTime.fromISO(user.last_login).setLocale(navigator.language).toLocaleString(DateTime.DATETIME_FULL)} </td>
              <td> {Duration.fromMillis('3600000').shiftTo('days', 'hours').toHuman()} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show ? (
        <UserForm
          show={show}
          handleClose={handleClose}
          users={users}
          selectedUserIndex={selectedUserIndex}
        />
      ) : null}
    </div>
  );
}

export default UserTable;
