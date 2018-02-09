import React, { Component } from 'react';
import './config/config';
import * as firebase  from 'firebase';
import TodoForm from './todoForm/todoForm';
import Todo from './Todo/todo';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.database = firebase.database().ref().child('todos');
    this.state= {
      todos: [],
      key: []
    };
  };
  componentDidMount(){
    this.database.on('value', snap => {
      console.log('Atif', snap);
      let todoKey = []
      let arr = [];
      let obj = snap.val();
      for(let k in obj){
        var value = obj[k]
        var key = k;
        arr.push(value);
        todoKey.push(key);
      };
      this.setState({
        todos: arr,
        key: todoKey
      })
    });
};
  removeTodo = (id) => {
    console.log('from parent' ,id);
    this.database.child(id).remove();
  };
  addTodo = (todo) => {
    if(todo){
      this.database.push({todoContent: todo});
    }
    else {
      alert('Please enter Todo first');
    }
  };
  render(){
    return(
      <div className='notesWrapper'>
        <div className='notesHeader'>
          <h1 className='heading'>Hello React and firebase!</h1>
        </div>
        <div className='notesBody'>
          {
            this.state.todos.map((todo, idx) => {
              console.log(todo);
              return (
                <Todo key={this.state.key[idx]} index={idx} addTodo={this.addTodo} removeTodo={this.removeTodo} todoContent={todo.todoContent} todoId={this.state.key[idx]} />                    
              );
            })
          }
        </div>
        <div className='notesFooter'>
          <TodoForm addTodo={this.addTodo} />
        </div>
      </div>
    )
  }
}

export default App;
