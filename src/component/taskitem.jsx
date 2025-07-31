import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      style={{
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: 'rgba(11, 59, 43, 0.34)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px', 
        borderRadius: '5px'
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <span style={{ marginLeft: '0.5rem' }}>{task.todo}</span>
      </div>
      <button onClick={onDelete} style={{borderRadius: '5px', border: '1px', margin: '2px'}}>Eliminar</button>
    </div>
  );
}

export default TaskItem;
