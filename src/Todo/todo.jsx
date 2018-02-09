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
        if(this.state.updateValue){
            firebase.database().ref().child(`todos/${this.todoId}`).update({todoContent: this.state.updateValue});
            console.log(this.state.updateValue, this.todoId);
            this.setState({
                isEdit: !this.state.isEdit,
            });
        }
        else{
            alert('Enter update Value');
        };
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
                <p className='noteContent'><span style={{background: 'none'}}>{`${this.props.index + 1 }: `}</span> { this.props.todoContent }
                <span className='deleteButton' onClick={() => this.handleDelete(this.todoId)}>
                    Delete
                </span>
                <span className='editButton' onClick={() => this.editButton(this.todoId)}>
                   Edit                    
                </span> 
                </p>
            </div>
        );
    };
    renderForm = () => {
        return(
            <form onSubmit={this.updateTodo} className='editForm'>
                <input type='text' onChange={this.updateValue} className='noteContent' defaultValue={this.props.todoContent} />
                <button type='submit' className='updateButton'>Update</button>
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