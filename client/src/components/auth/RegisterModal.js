import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends React.Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error, isAthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // if authenticated close modal
    if (this.state.modal) {
      if (isAthenticated) {
        this.toggle();
      }
    }
  }
  toggle = () => {
    //   clear all errors
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = { name, email, password };
    // this.props.register(newUser);
    this.props.register(newUser);
    // this.toggle();
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            {this.state.msg && <Alert color="danger">{this.state.msg}</Alert>}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="Password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
// isAthenticated;
const mapStateToProps = state => ({
  isAthenticated: state.auth.isAthenticated,
  error: state.error
});
// const mapDispatchToProps = dispatch => ({
//   register: newUser => {
//     dispatch(register(newUser));
//   }
// });
export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
