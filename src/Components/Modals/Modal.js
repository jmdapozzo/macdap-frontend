import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEdit'

function ModalForm(props) {

  const { t, i18n } = useTranslation(['users', 'common']);

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>
  const label = props.buttonLabel

  let button = ''
  let title = ''

  if (label === t('common:buttonLabel.edit')) {
    button = <Button
      color="warning"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = t('title.modalEdit')
  } else {
    button = <Button
      color="success"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = t('title.modalAdd')
  }


  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
        <ModalBody>
          <AddEditForm
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            toggle={toggle}
            item={props.item} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ModalForm