import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";

function UserForm({ show, handleClose, users, selectedUserIndex }) {
  const { t } = useTranslation(["user", "common"]);

  return (
    <Modal
      show={show}
      animation={false}
      onHide={handleClose}
      dialogClassName={"primaryModal"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("dialog.title")}</Modal.Title>
      </Modal.Header>

      <Modal.Body></Modal.Body>

      <Modal.Footer>
        <Modal.Title>{t("dialog.title")}</Modal.Title>
      </Modal.Footer>
    </Modal>
  );
}

export default UserForm;
