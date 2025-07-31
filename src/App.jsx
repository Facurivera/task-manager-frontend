import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskItem from './component/taskitem';

const API_URL = 'https://dummyjson.com/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [showCompleted, setShowCompleted] = useState(null);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = useCallback(async () => {
    const res = await axios.get(`${API_URL}?limit=150`);
    let list = res.data.todos;

    if (search) {
      list = list.filter(task =>
        task.todo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (showCompleted !== null) {
      list = list.filter(task => task.completed === showCompleted);
    }

    setTasks(list);
  }, [search, showCompleted]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async () => {
    if (!newTask.trim()) return;

    await axios.post(API_URL + '/add', {
      todo: newTask,
      completed: false,
      userId: 1
    });

    setNewTask('');
    fetchTasks();
  };

  const handleUpdate = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed });
    fetchTasks();
  };

  const handleDelete = async id => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto', background: 'rgb(3, 112, 76);' }}>
      <h1 style={{fontFamily: 'sans-serif'}}>Gestor de Tareas</h1>

      <input
        type="text"
        placeholder="Buscar tareas..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', border: '1px', borderRadius: '5px' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShowCompleted(null)} style={{borderRadius: '5px', border: '1px', margin: '2px'}}>Todas</button>
        <button onClick={() => setShowCompleted(true)} style={{borderRadius: '5px', border: '1px', margin: '2px'}}>Completadas</button>
        <button onClick={() => setShowCompleted(false)} style={{borderRadius: '5px', border: '1px', margin: '2px'}}>Pendientes</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          style={{border: '1px', borderRadius: '5px'}}
        />
        <button onClick={handleCreate} style={{borderRadius: '5px', border: '1px', margin: '2px'}}>Agregar</button>
      </div>

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => handleUpdate(task.id, !task.completed)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </div>
  );
}

export default App;
