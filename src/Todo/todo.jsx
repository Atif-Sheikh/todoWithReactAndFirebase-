import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import * as firebase from 'firebase';

class Todo extends Component{
    constructor(props){
        super(props);
        this.todoId = props.todoId;
        // this.todoContent = props.todoContent;
        this.addTodo = props.addTodo;
        this.state = {
            isEdit: false,
            updateValue: ''
        };  
    };
    updateValue = (evt) => {
        this.setState({
            updateValue: evt.target.value,
        });
    };
    updateTodo = (evt) => {
        evt.preventDefault();
        firebase.database().ref().child(`todos/${this.todoId}`).update({todoContent: this.state.updateValue});
        console.log(this.state.updateValue, this.todoId);
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };
    editButton = (id) => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
        console.log(id);
    };
    handleDelete = (id) => {
        this.props.removeTodo(id);
    };
    cancelButton = (e) => {
        e.preventDefault();
        this.setState({
            isEdit: false,
        })
    }
    renderItem = () => {
        console.log(this.props.todoContent)
        return(
            <div className='todoContent'>   
                <p className='noteContent'> { this.props.todoContent }
                <span className='editButton' onClick={() => this.editButton(this.todoId)}>
                    &times;
                </span> 
                <span className='deleteButton' onClick={() => this.handleDelete(this.todoId)}>
                    &times;
                </span>
                </p>
            </div>
        );
    };
    renderForm = () => {
        return(
            <form onSubmit={this.updateTodo} className='editForm'>
                <input type='text' onChange={this.updateValue} className='noteContent' defaultValue={this.props.todoContent} />
                <button type='submit' className='updateButton'>Update Todo</button>
                <button className='cancelButton' onClick={this.cancelButton}>Cancel</button>                      
            </form>
        );
    };
    render(props){
        const { isEdit } = this.state;
        return(
            <section>
            {
                isEdit ? this.renderForm() : this.renderItem()
            }
            </section> 
        );
    }
}

Todo.propTypes = {
    todoContent: PropTypes.string
}

export default Todo;