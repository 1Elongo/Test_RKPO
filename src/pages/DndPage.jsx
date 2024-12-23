import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';

function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
                { id: '3', content: 'third task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        Done: {
            name: 'Done',
            items: [],
        },
        Blocked: {
            name: 'Blocked',
            items: [],
        },
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = destination.droppableId === source.droppableId ? sourceItems : [...destColumn.items];

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    };

    const deleteTask = (columnId, taskId) => {
        const column = columns[columnId];
        const updatedItems = column.items.filter(item => item.id !== taskId);

        setColumns({
            ...columns,
            [columnId]: {
                ...column,
                items: updatedItems,
            },
        });
    };


    return (
        <div>
            <Link 
                to="/" 
                style={{ 
                    display: 'inline-block', 
                    padding: '10px 20px', 
                    backgroundColor: 'orange', 
                    color: 'white', 
                    borderRadius: '5px', 
                    textDecoration: 'none', 
                    marginBottom: '20px' 
                }}
            >
                Go to a regular My To Do List
            </Link>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        padding: 13,
                                        width: 100,
                                        background: '#708090',
                                        borderRadius: 5,
                                        margin: '0 10px',
                                    }}
                                >
                                    <h2>{column.name}</h2>
                                    {column.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        padding: 20,
                                                        margin: '0 0 10px 0',
                                                        backgroundColor: '#FFA500',
                                                        color: 'white',
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    {item.content}
                                                    <button 
                                                        onClick={() => deleteTask(columnId, item.id)} 
                                                        style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

export default DndPage;
