import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

function SopfeuForm({ items, index }) {

  const { t, i18n } = useTranslation(['sopfeu', 'common']);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="success" onClick={handleShow} style={{ float: "left", marginRight: "10px" }}>Open</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Index is {index}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('common:buttonLabel.close')}</Button>
          <Button variant="primary" type="submit" form="userForm" onClick={handleClose}>{t('common:buttonLabel.saveChanges')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SopfeuForm

