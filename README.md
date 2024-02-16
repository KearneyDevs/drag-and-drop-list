# Drag and Drop List

In this example, each task is represented by a div element with the draggable attribute. We use the onDragStart, onDragOver, and onDrop events to handle the drag-and-drop functionality.

## Hooks

We use the useState and useRef hook in order to accomplish the drag and drop functionality.

useState is contains the list items
useRef lets you reference a value that is not needed for rendering, in this case it has the value of null. We assign useRef to draggedItemId.

```js
import { useState, useRef } from "react";

const App = () => {
  const draggedItemId = useRef(null);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ]);

  return (
    <div className="App">
      <h1>Drag and Drop Example</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
```

## Functions

**handleDragStart:** Sets the dragged task's ID in the data transfer during the drag start.

```js
const handleDragStart = (id) => {
  draggedItemId.current = id;
};
```

**handleDragOver:** Prevents the default behavior to allow the drop.

```js
const handleDragOver = (e) => {
  e.preventDefault();
};
```

**handleDrop:** Retrieves the dragged task, updates the tasks array, and sets the new state.

```js
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
```

## Render

```js
return (
  <div className="App">
    <h1>Drag and Drop Example</h1>
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
          {task.text}
        </div>
      ))}
    </div>
  </div>
);
```

## DOM props

draggable: A boolean. Specifies whether the element is draggable and is part of the drag and drop api.

onDragStart: A DragEvent handler function. Fires when the user starts dragging an element.

onDragOver: A DragEvent handler function. Fires on a valid drop target while the dragged content is dragged over it. You must call e.preventDefault() here to allow dropping.

onDrop: A DragEvent handler function. Fires when something is dropped on a valid target.

### My understanding of handleDrop

First we need to create three variables:
**draggedTask:** which finds a task within our tasks list that is equal to the useRef variable draggedItemId.current. This is the task we are dragging.
**updatedTasks:** which filters the currently dragged item from the tasks list.
**targetIndex:** uses the findIndex method on the tasks list to determine which index the dragged item gets set to.

## Use of splice

The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

The first parameter is start, which is a zero-based index at which to start changing the array, converted to an integer.

The second parameter is deleteCount which is an integer indicating the number of elements in the array to remove from start. In this case its zero.

The third and final parameter is item1, ..., itemN which is the elements to add to the array, beginning from start. If you do not specify any elements, splice() will only remove elements from the array.

```js
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
```

## My understanding of the splice method in handleDrop

I am using the splice method to replace items within the tasks list. I provide the splice method with the targetIndex of where I want the dragged list item to be inserted, I then tell it that no elements should be removed from the list, and the third parameter I tell it to insert the element to the intended targetIndex.
