import { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedTask = tasks.find((task) => task.id.toString() === draggedId);
    const updatedTasks = tasks.filter(
      (task) => task.id.toString() !== draggedId
    );
    const targetIndex = tasks.findIndex(
      (task) => task.id.toString() === targetId
    );

    updatedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Drag and Drop Example</h1>
      <div className="task-container">
        {tasks.map(({ id, text }) => (
          <div
            key={id}
            className="task"
            draggable
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, id)}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
