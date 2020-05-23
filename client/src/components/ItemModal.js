import React, {Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import uuid from 'react-uuid';


class ItemModal extends Component {
state = {
  isOpen: false,
  name: ''
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });

}
onSubmit = (e) => {
  e.preventDefault();
  const newItem = {
    id: uuid(),
    name: this.state.name
  }
  this.props.addItem(newItem);
  this.toggle();
}

onChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

render(){
  return(
<Container>
    <Button
    id="Add-Item"
    color="dark"
    onClick={this.toggle}
    >
      Add Item
    </Button>

    <Modal
    isOpen={this.state.isOpen}
    toggle={this.toggle}
    >

    <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
    <ModalBody>
    <Form onSubmit={this.onSubmit}>
    <FormGroup>
    <Label for='item'>Add Shopping Item</Label>
    <Input
    type="text"
    name="name"
    id='item'
    placeholder='Add your shopping item here'
    onChange={this.onChange}
    />
    <br/>
    <Button>Add Item</Button>
    </FormGroup>
    </Form>
    </ModalBody>
    </Modal>
    </Container>
  );
}

}//End of ItemModal class

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, {addItem} )(ItemModal)
