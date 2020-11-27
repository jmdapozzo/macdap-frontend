import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {

  const { t, i18n } = useTranslation(['users', 'common']);

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

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
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
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
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
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (props.item) {
      const { id, first, last, email, phone, location, hobby } = props.item
      setValues({ id, first, last, email, phone, location, hobby })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">{t('fieldLabel.first')}</Label>
        <Input type="text" name="first" id="first" onChange={onChange} value={form.first === null ? '' : form.first} />
      </FormGroup>
      <FormGroup>
        <Label for="last">{t('fieldLabel.last')}</Label>
        <Input type="text" name="last" id="last" onChange={onChange} value={form.last === null ? '' : form.last} />
      </FormGroup>
      <FormGroup>
        <Label for="email">{t('fieldLabel.email')}</Label>
        <Input type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email} />
      </FormGroup>
      <FormGroup>
        <Label for="phone">{t('fieldLabel.phone')}</Label>
        <Input type="text" name="phone" id="phone" onChange={onChange} value={form.phone === null ? '' : form.phone} placeholder={t('fieldPlaceholder.phone')} />
      </FormGroup>
      <FormGroup>
        <Label for="location">{t('fieldLabel.location')}</Label>
        <Input type="text" name="location" id="location" onChange={onChange} value={form.location === null ? '' : form.location} placeholder={t('fieldPlaceholder.location')} />
      </FormGroup>
      <FormGroup>
        <Label for="hobby">{t('fieldLabel.hobby')}</Label>
        <Input type="text" name="hobby" id="hobby" onChange={onChange} value={form.hobby} />
      </FormGroup>
      <Button>{t('common:buttonLabel.submit')}</Button>
    </Form>
  )
}

export default AddEditForm