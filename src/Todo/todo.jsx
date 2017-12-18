import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class Todo extends Component{
    constructor(props){
        super(props);
        this.todoId = props.todoId;
        this.todoContent = props.todoContent;    
    }

    handleDelete = (id) => {
        console.log('from child', id)
        return this.props.removeTodo(id);
    }
    render(props){
        return(
            <div className='todoContent'>   
                <p className='noteContent'> { this.todoContent } 
                <span className='deleteButton' onClick={() => this.handleDelete(this.todoId)}>
                    &times;
                </span>
                </p>
            </div>
        );
    }
}

Todo.propTypes = {
    todoContent: PropTypes.string
}

export default Todo;