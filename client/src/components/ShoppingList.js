import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'react-uuid';
import {connect} from 'react-redux';
import {getItems, deleteItem, addItem } from '../actions/itemActions';
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  componentDidMount(){
    this.props.getItems();
  }//End of componentDidMount

onDeleteClick = (id) => {
  this.props.deleteItem(id);

}
onAddClick = (name) => {
  this.props.addItem(name);

}

  render() {
    const {items} = this.props.item;
    return (
      <Container>

      <ListGroup>
        <TransitionGroup className="shopping-list">{

            items.map(({id, name}) => (
              <CSSTransition key={id} timeout={500}>
              <ListGroupItem className="text-left">
                <Button
                  className="remove-btn"
                  color='danger'
                  size='sm'
                  onClick={this.onDeleteClick.bind(this, id)}
                  >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>))
          }
        </TransitionGroup>
      </ListGroup>
    </Container>);
  }//End of Render


}//End of the class

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};//End of ShoppingList.propTypes

const mapStateToProps = state => ({
  item: state.item
});//End of the const mapStateToProps

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
