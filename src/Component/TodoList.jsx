import React, { useState } from "react";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
function TodoList() {
  const dummyTodos = [
    {
      id: 1,
      text: "Create a React Todo App",
      completed: false,
    },
    {
      id: 2,
      text: "Style the Todo List",
      completed: true,
    },
    {
      id: 3,
      text: "Add Functionality to Mark Todos as Completed",
      completed: false,
    },
  ];
  const [TodoData, setTodoData] = useState(dummyTodos);

  console.log(TodoData);
  function handleCheck(id) {
    // console.log(e)
    setTodoData((prev) => {
      {
        return  prev.map((data) =>
          id == data.id ? { ...data, completed: !data.completed } : data
        );
      }
    });
  }
  function handleDelete(id){
    setTodoData((prev)=>{
      return prev.filter(data => data.id != id)
    })
  }
  

  return (
    <div>
      <p>
        {TodoData.map((data) => (
          <div>
            <li key={data.id} onClick={() => handleCheck(data.id)}>
              <input type="checkbox" checked={data.completed} />
              <label>{data.text}</label>
            </li>
            <button onClick={() => handleDelete(data.id)}>
              <FaTrash className="deleteButton" />
            </button>
          </div>
        ))}
      </p>
    </div>
  );
}

export default TodoList;
