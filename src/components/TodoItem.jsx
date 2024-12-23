import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo }) {
    return (
        <li className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button className="delete" onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;