import { useState } from "react";

let nextId = 1;

function TaskItem({ task, onToggle, onDelete }) {
// answer: in onDelete={deleteTask}, we are passing only function name(deleteTask). but the fuction requires a parameter which idToDelete. we are not passing this id. we are passing this id using onDelete(task.id).

  return (
    <li >
      
          
          <label>
          <input
            type="checkbox"
            checked={Boolean(task.completed)}
            onChange={() => onToggle(task.id)}
          />
          {task.title}
        </label>
        {" — "}
        {task.completed ? "Done" : "Pending"}
        {" "}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>


          
    </li>
  );
}



function validateTaskTitle(trimmedTitle) {
  // TODO: If trimmedTitle is empty,
  // return "Please enter a task title."
if (trimmedTitle === "")
  return "Please enter a task title."
if (trimmedTitle.length > 50)
  return "Keep the title to 50 characters or fewer."
  // TODO: If trimmedTitle.length is greater than 50,
  // return "Keep the title to 50 characters or fewer."

  return "";
}


export default function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("all");
  const [error, setError] = useState("");

  function addTask(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();


   const message = validateTaskTitle(trimmedTitle);

setError(message);

if (message !== "") {
  return;
}

    const newTask = {
      id: nextId++,
      title: trimmedTitle,
      completed: false,
    };
    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTitle("");
  }

  function deleteTask(idToDelete) {
    // TODO: Call setTasks with an updater function.
    // Use previousTasks.filter(...) to keep tasks
    // whose id is different from idToDelete.
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== idToDelete)
    );
  }


  function toggleTask(idToToggle) {
  setTasks(previousTasks =>
    previousTasks.map(task => {
      // TODO:
      // If task.id matches idToToggle, return a NEW object
      if (task.id === idToToggle){
        return{ ...task, completed: !task.completed }
        //return !task.completed;
      }
      // with the same properties but completed flipped.
      // Otherwise, return task unchanged.
      else
      return task;// Replace this placeholder with your logic.
    })
  );
}


const visibleTasks = tasks.filter(task => {
  // TODO:
  // "pending": keep tasks that are not completed.
  if (view==="pending"){
    return !task.completed;

  }
   else if (view==="done"){
    return task.completed;

  }
  // "done": keep tasks that are completed.
  // "all": keep every task.

  return true; // Placeholder: currently shows everything.
});


let emptyMessage = "";

// TODO: Check whether tasks.length is zero.
// If so, assign the first message to emptyMessage.
if (tasks.length == 0)
  emptyMessage = "No tasks yet. Add your first task.";
else if (visibleTasks.length ==0)
  emptyMessage= "No tasks match this view.Switch to all."

// Otherwise, check whether visibleTasks.length is zero.
// If so, assign the second message to emptyMessage.



  return (
    <main>

      <h1>My Task Tracker</h1>

      <form onSubmit={addTask}>
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

         {error !=="" && <p role="alert">{error}</p>}
        <button type="submit">Add task</button>
      </form>

      <p>Total tasks: {tasks.length}</p>


      <label>
  Show:{" "}
  <select
    value={view}
    onChange={event => setView(event.target.value)}
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="done">Done</option>
  </select>
</label>

<p>
  Showing {visibleTasks.length} of {tasks.length} tasks
</p>


{/* TODO: When emptyMessage !== "", render
    a <p> containing {emptyMessage}. Use the && pattern above. */
    
    emptyMessage !== "" && <p>{emptyMessage}</p>
    
    
    }



<ul>
  {visibleTasks.map(task => (
    <TaskItem

      key={task.id}
      task={task}
      onToggle={toggleTask}
      onDelete={deleteTask}
    />
  ))}
</ul>
    </main>
  );
}
