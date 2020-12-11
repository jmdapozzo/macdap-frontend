import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form } from 'react-bootstrap'

function UserForm(props) {

  const { t } = useTranslation(['users', 'common']);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setValues] = useState({
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const label = props.buttonLabel

  let button = ''
  let title = ''

  if (label === t('common:buttonLabel.edit')) {
    button = <Button
      variant="success"
      //variant="warning"
      onClick={handleShow}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = t('dialogTitle.edit')
  } else {
    button = <Button
      variant="success"
      onClick={handleShow}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = t('dialogTitle.add')
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3001/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: form.first,
        last: form.last,
        email: form.email,
        phone: form.phone,
        location: form.location,
        hobby: form.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.addItemToState(item[0])
          //props.toggle()
          setValues({ id: 0, first: '', last: '', email: '', phone: '', location: '', hobby: '' });
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3001/users', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        first: form.first,
        last: form.last,
        email: form.email,
        phone: form.phone,
        location: form.location,
        hobby: form.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.updateState(item[0])
          //props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (props.item) {
      const { id, first, last, email, phone, location, hobby } = props.item;
      setValues({ id, first, last, email, phone, location, hobby });
    }
  }, [false]);

  return (
    <div>
      {button}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.item ? submitFormEdit : submitFormAdd} id="userForm">
            <Form.Group >
              <Form.Label>{t('fieldLabel.first')}</Form.Label>
              <Form.Control type="text" name="first" id="first" onChange={onChange} value={form.first === null ? '' : form.first} />
            </Form.Group>
            <Form.Group >
              <Form.Label>{t('fieldLabel.last')}</Form.Label>
              <Form.Control type="text" name="last" id="last" onChange={onChange} value={form.last === null ? '' : form.last} />
            </Form.Group>
            <Form.Group >
              <Form.Label>{t('fieldLabel.email')}</Form.Label>
              <Form.Control type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email} />
            </Form.Group>
            <Form.Group >
              <Form.Label>{t('fieldLabel.phone')}</Form.Label>
              <Form.Control type="text" name="phone" id="phone" onChange={onChange} value={form.phone === null ? '' : form.phone} placeholder={t('fieldPlaceholder.phone')} />
            </Form.Group>
            <Form.Group >
              <Form.Label>{t('fieldLabel.location')}</Form.Label>
              <Form.Control type="text" name="location" id="location" onChange={onChange} value={form.location === null ? '' : form.location} placeholder={t('fieldPlaceholder.location')} />
            </Form.Group>
            <Form.Group >
              <Form.Label>{t('fieldLabel.hobby')}</Form.Label>
              <Form.Control type="text" name="hobby" id="hobby" onChange={onChange} value={form.hobby} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('common:buttonLabel.close')}</Button>
          <Button variant="primary" type="submit" form="userForm" onClick={handleClose}>{t('common:buttonLabel.saveChanges')}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserForm