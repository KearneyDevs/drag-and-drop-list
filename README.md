# Drag and Drop List

In this example, each task is represented by a div element with the draggable attribute. We use the onDragStart, onDragOver, and onDrop events to handle the drag-and-drop functionality.

handleDragStart: Sets the dragged task's ID in the data transfer during the drag start.
handleDragOver: Prevents the default behavior to allow the drop.
handleDrop: Retrieves the dragged task, updates the tasks array, and sets the new state.
