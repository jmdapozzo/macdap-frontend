import React, { Component } from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

class SopfeuFormClass extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  showDialog() {
    this.setState({
      show: true
    })
  }

  hideDialog() {
    this.setState({
      show: false
    })
  }

  render() {

    return (
      <div>
        <Button variant="success" onClick={this.showDialog()} style={{ float: "left", marginRight: "10px" }}>Open</Button>

        <Modal show={this.state.show} onHide={this.hideDialog()}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>SopfeuForm class</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideDialog()}>Close</Button>
            <Button variant="primary" type="submit" form="userForm" onClick={this.hideDialog()}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default SopfeuFormClass

