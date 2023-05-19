import React, { useState } from 'react';
import { toast } from 'react-toastify';

type Todo = {
  id: string;
  title: string;
  subTasks: Todo[];
};

const TodoMain: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newSubTasks, setNewSubTasks] = useState<{ [key: string]: string }>({});


  const handleSubTaskInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parentId: string
  ) => {
    setNewSubTasks((prevState) => ({
      ...prevState,
      [parentId]: e.target.value,
    }));
  };

  const handleAddTodo = () => {
    if(newTodo){
        const newTodoItem: Todo = {
          id: JSON.stringify(Math.random()),
          title: newTodo,
          subTasks: [],
        };
    
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    }else{
        toast.error('Enter a Value to Add Todo', { toastId: 'todoerror' })
    }
  };

  const handleAddSubTask = (parentId: string) => {
    const parentTodo = todos.find((todo) => todo.id === parentId);
    if (parentTodo) {
        if(newSubTasks[parentId]){
            const newSubTaskItem: Todo = {
                id: JSON.stringify(Math.random()),
                title: newSubTasks[parentId] || '',
                subTasks: [],
              };
        
              parentTodo.subTasks.push(newSubTaskItem);
              setTodos([...todos]);
              setNewSubTasks((prevState) => ({
                ...prevState,
                [parentId]: '',
              }));
        }else{
            toast.error('Enter a Value to Add Sub Task', { toastId: 'todosubtaskerror' })
        }
    }
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleDeleteSubTask = (parentId: string, subTaskId: string) => {
    const parentTodo = todos.find((todo) => todo.id === parentId);
    if (parentTodo) {
      parentTodo.subTasks = parentTodo.subTasks.filter(
        (subTask) => subTask.id !== subTaskId
      );
      setTodos([...todos]);
    }
  };

  return (
    <div>
      <h2>Nested Todo List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="border mb-3 p-3">
          <h4>{todo.title}</h4>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            Delete
          </button>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add Sub Task"
              value={newSubTasks[todo.id] || ''}
              onChange={(e) => handleSubTaskInputChange(e, todo.id)}
            />
            <button
              className="btn btn-success btn-sm mt-2"
              onClick={() => handleAddSubTask(todo.id)}
            >
              Add Sub Task
            </button>
          </div>
          <ul className="list-group mt-3">
            {todo.subTasks.map((subTask) => (
              <li
                key={subTask.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {subTask.title}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteSubTask(todo.id, subTask.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TodoMain;
