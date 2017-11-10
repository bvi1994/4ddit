import { Button, Modal, Form, FormControl, Col, FormGroup, Checkbox } from 'react-bootstrap';
import React from 'react';

/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

const LoginModal = React.createClass({
    getInitialState() {
        return { show: false };
    },

    render() {
        let close = () => this.setState({ show: false });

        return (
          <div className="modal-container" style={{ height: 200 }}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={() => this.setState({ show: true })}
            >
              Login
            </Button>

            <Modal
              show={this.state.show}
              onHide={close}
              container={this}
              aria-labelledby="contained-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Login to 4eddit!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="formUsername">
                    <Col sm={2}>
                      Username
                    </Col>
                    <Col sm={10}>
                      <FormControl type="Login" placeholder="Username" />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formPassword">
                    <Col sm={2}>
                      Password
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Password" />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">
                        Sign in
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    },
});

// ReactDOM.render(<Trigger />, mountNode);

export default LoginModal;
