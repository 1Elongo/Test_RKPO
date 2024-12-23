// src/pages/TodoPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import TodoList from '../components/TodoList';

function Todopage() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'ЛАБ1 РКПО', completed: true },
        { id: 2, title: 'ЛАБ2 РКПО', completed: true },
        { id: 3, title: 'ЛАБ3 РКПО', completed: true },
        { id: 4, title: 'ЛАБ4 РКПО', completed: false },
        { id: 5, title: 'ЛАБ5 РКПО', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const newTodoItem = {
            id: Date.now(),
            title: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const incomplete = todos.filter(todo => !todo.completed).length;

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true; // 'all'
    });

    return (
        <div className="app-container">
            <Link to="/dnd"             className="dnd-link">
            Go to DND sheet
            </Link>
            <h1 className="title">My To Do List</h1>
            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Добавить новую задачу..."
                    className="todo-input"
                />
                <button type="submit" className="add-button">Add</button>
            </form>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>
                    All ({total})
                </button>
                <button onClick={() => setFilter('completed')}>
                    Completed ({completed})
                </button>
                <button onClick={() => setFilter('incomplete')}>
                    No Completed ({incomplete})
                </button>
            </div>
            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        </div>
    );
}

export default Todopage;