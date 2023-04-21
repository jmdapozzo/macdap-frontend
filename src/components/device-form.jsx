import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Button } from "react-bootstrap";

function DeviceForm({ show, close, device }) {
  const { t } = useTranslation(["device", "common"]);

  const [form, setValues] = useState({
    company: "",
    contact: "",
    email: "",
    location: "",
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const company = device.company_name;
    const contact = device.contact_name;
    const email = device.contact_email;
    const location = device.location_name;
    setValues({ company, contact, email, location });
  }, [device]);

  const handleClose = () => {
    close(null);
  };

  const handleSave = () => {
    device.company_name = form.company;
    device.contact_name = form.contact;
    device.contact_email = form.email;
    device.location_name = form.location;
    close(device);
  };

  return (
    <Modal
      show={show}
      animation={false}
      onHide={close}
      dialogClassName={"primaryModal"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("dialog.title")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          //onSubmit={props.item ? submitFormEdit : submitFormAdd}
          id="userForm"
        >
          <Form.Group>
            <Form.Label>{t("fieldLabel.company_name")}</Form.Label>
            <Form.Control
              type="text"
              name="company"
              id="company"
              onChange={onChange}
              value={form.company === null ? "" : form.company}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("fieldLabel.contact_name")}</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              id="contact"
              onChange={onChange}
              value={form.contact === null ? "" : form.contact}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("fieldLabel.contact_email")}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              value={form.email === null ? "" : form.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t("fieldLabel.location_name")}</Form.Label>
            <Form.Control
              type="text"
              name="location"
              id="location"
              onChange={onChange}
              value={form.location === null ? "" : form.location}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("common:buttonLabel.close")}
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {t("common:buttonLabel.saveChanges")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeviceForm;
