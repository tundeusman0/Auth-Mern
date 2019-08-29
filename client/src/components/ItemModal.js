import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/item';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class ItemModal extends React.Component {
  state = {
    modal: false,
    name: ''
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  onChange = e => {
    const name = e.target.value;
    this.setState({ name });
  };
  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    this.props.addItem(newItem);
    this.toggle();
  };
  render() {
    return (
      <div>
        {this.props.isAthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Login to add Item</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add To Shopping Item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAthenticated: state.auth.isAthenticated
});
const mapDispatchToProps = dispatch => ({
  addItem: newItem => {
    dispatch(addItem(newItem));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemModal);
