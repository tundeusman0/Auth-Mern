import React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getItems, deleteItem } from '../actions/item';

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }
  onDelete = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.getItem;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shoppingList">
            {items.map(({ _id: id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDelete.bind(this, id)}
                  >
                    &times;
                  </Button>

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapSateToProps = state => ({
  getItem: state.item
});
export default connect(
  mapSateToProps,
  { getItems, deleteItem }
)(ShoppingList);
