import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import { connect } from 'react-redux';
import { removeTodo, removeMassTodo, toggleSelect } from '../actions/todos';

class TodoListing extends React.PureComponent {

  handleSelect = (item) => () => {
    this.props.dispatch(toggleSelect(item));
  };

  handleDelete = (item) => () => {
    this.props.dispatch(removeTodo(item));
  };

  handleMassDelete = () => {
    this.props.dispatch(removeMassTodo());
  };

  render() {
    const {todos} = this.props;
    return (
      <Row>
        {todos.length > 0 && todos.map(item =>
          <Col xs={12} key={item.id}>
            <TodoItem
              item={item}
              onClickCheck={this.handleSelect(item)}
              onClickDelete={this.handleDelete(item)}
            />
          </Col>,
        )}
        <Col xs={12}>
          <TodoFooter items={todos} onClickDelete={this.handleMassDelete}/>
        </Col>
      </Row>
    );
  }
}

TodoListing.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
};

const mapStateToProps = (state) => {
  console.log(state.todos);
  console.log(state.todos.items.length);
  return {
    todos: state.todos.items,
  };
};

export default connect(mapStateToProps)(TodoListing);