import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Offcanvas, Form, Button } from "react-bootstrap";

function DeviceCanvas({ show, close, identification, device }) {
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

  const handleSave = () => {
    device.company_name = form.company;
    device.contact_name = form.contact;
    device.contact_email = form.email;
    device.location_name = form.location;
    close(device);
  };

  return (
    <Offcanvas show={show} onHide={close} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{t("dialog.title")} {identification}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Form
          //onSubmit={props.item ? submitFormEdit : submitFormAdd}
          id="userForm"
        >
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              name="company"
              id="company"
              onChange={onChange}
              value={form.company === null ? "" : form.company}
            />
            <Form.Label htmlFor="company">
              {t("fieldLabel.company_name")}
            </Form.Label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              name="contact"
              id="contact"
              onChange={onChange}
              value={form.contact === null ? "" : form.contact}
            />
            <Form.Label htmlFor="contact">
              {t("fieldLabel.contact_name")}
            </Form.Label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              name="email"
              id="email"
              onChange={onChange}
              value={form.email === null ? "" : form.email}
            />
            <Form.Label htmlFor="email">
              {t("fieldLabel.contact_email")}
            </Form.Label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              name="location"
              id="location"
              onChange={onChange}
              value={form.location === null ? "" : form.location}
            />
            <Form.Label htmlFor="location">
              {t("fieldLabel.location_name")}
            </Form.Label>
          </Form.Floating>
        </Form>

        <Button variant="primary" onClick={handleSave}>
          {t("common:buttonLabel.saveChanges")}
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default DeviceCanvas;
