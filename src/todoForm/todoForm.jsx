import React, { Component } from 'react';
import '../App.css';

class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTodo: ''
        };
    }

    onChangeInput = (e) => {
        console.log(e.target.value);
        this.setState({
            newTodo: e.target.value
        })
    }

    onPress = (e) => {
        e.preventDefault();

        this.props.addTodo(this.state.newTodo);

        this.setState({
            newTodo: ''
        })
    }
    render(){
        return(
            <div className='todoFooter'>
                <form onSubmit={this.onPress} className='todoForm'>
                <input type='text' className='todoInput' onChange={this.onChangeInput} value={this.state.newTodo} placeholder='Enter Todo...' />
                <button type='submit' className='todoButton' >Add Todo</button>
                </form>
            </div>
        )
    }
}
export default TodoForm;