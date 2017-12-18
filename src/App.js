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
    }
  }

  componentWillMount(){
    const previousTodos = this.state.todos;
    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todoContent: snap.val().todoContent, 
      });
      this.setState({
        todos: previousTodos
      })
    });

    this.database.on('child_removed', snap => {
      this.previousTodos = previousTodos.filter((x) => x.id !== snap.key);
      this.setState({
        todos: this.previousTodos,
      });
      
      // for(var i=0; i < previousTodos.length; i++){
      //   if(previousTodos[i].id === snap.key){
      //     previousTodos.splice(i, 1);
      //   }
      // }
      // this.setState({
      //     todos: this.previousTodos
      //   });
    })
  }
  
  removeTodo = (todo) => {
    console.log('from parent' ,todo);
    this.database.child(todo).remove();
  }

  addTodo = (todo) => {
    if(todo){
      this.database.push().set({todoContent: todo});
    }
    else {
      alert('Please enter Todo first');
    }
    // const previousTodos = this.state.todos;
    // previousTodos.push({id: this.state.todos.length + 1, todoContent: todo});
    // this.setState({
    //   todos: previousTodos
    // });
  }
  render(){
    return(
      <div className='notesWrapper'>
        <div className='notesHeader'>
          <h1>Hello React and firebase!</h1>
        </div>
        <div className='notesBody'>
          {
            this.state.todos.map((todo) => {
              return (
                <Todo key={todo.id} removeTodo={this.removeTodo} todoContent={todo.todoContent} todoId={todo.id} />                    
              )
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
