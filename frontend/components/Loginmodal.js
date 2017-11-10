import { Button, Modal, Popover, FormGroup, FormControl} from 'react-bootstrap';
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
        return { isModalOpen: false };
    },

    close() {
        this.setState({isModalOpen: false});
    },

    open() {
        this.setState({isModalOpen: true});
    },

    render() {
        const popover = (
          <Popover id="modal-popover" title="popover">
            very popover. such engagement
          </Popover>
      );

        return (
          <div className="modal-container" style={{height: 200}}>
            <Button
              bsStyle="primary"
              bsSize="large"
              onClick={this.open}>
              Login
            </Button>
            <Modal show={this.state.isModalOpen} onHide={this.close} container={this} bsSize="small">
              <Modal.Header closeButton>
                  <Modal.Title id="loginTitle">Login or Register to 4eddit!</Modal.Title>
              </Modal.Header>
                <form>
                  <FormGroup>
                    <FormControl type="text" value={this.state.value} placeholder="Username" onChange={this.handleChange} />
                    <FormControl type="password" value={this.state.value} placeholder="Password" onChange={this.handleChange} />
                  </FormGroup>
                </form>
                <Modal.Footer>
                  <Button onClick={this.close}>Login</Button>
                  <Button onClick={this.close}>Register</Button>
                </Modal.Footer>
            </Modal>
          </div>
        );
    },
});


// ReactDOM.render(<Trigger />, mountNode);

export default LoginModal;
