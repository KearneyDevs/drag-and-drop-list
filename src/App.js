import { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const draggedItemId = useRef(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "React" },
    { id: 2, text: "Vue" },
    { id: 3, text: "Angular" },
  ]);

  const handleDragStart = (id) => {
    draggedItemId.current = id;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetId) => {
    const draggedTask = tasks.find((task) => task.id === draggedItemId.current);

    const updatedTasks = tasks.filter(
      (task) => task.id !== draggedItemId.current
    );

    const targetIndex = tasks.findIndex((task) => task.id === targetId);

    updatedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(updatedTasks);
    draggedItemId.current = null;
  };

  return (
    <div className="App">
      <h1>React drag and drop example</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task"
            draggable
            onDragStart={() => handleDragStart(task.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(task.id)}
          >
            <p>{task.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
