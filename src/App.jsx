import { useState, useEffect } from "react";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  // The three dots return an arry it is called spread operator mean all the other thing except the id return them👇🏽👇🏽
  // The setTodos take a callback because if we directly put setTodos(todo) it will destory all the other values so we will use spread operators to achieve the previous values also in the todo🢃🧠🧠
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  // The update todo will check the prevTodo.id which is id in the add to do with the local id if exist it will return todo other wise it will return prevTodo👇🏽🧠
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  // In the delete function we have array with old data we will want to recive a new array but only delete those todo which on the id in the parameter of deletetodo
  // The filter will search for the prevTodo👇🏽🧠 id if the prevTodo.id mean a todo is in the todo  then remove it with filter and give us an array which don't have the deleted todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  // The set toggle will go to the  context todo object and will check the toggle if it is  true then give me all the other values the same except the completed property if it is true turn it false and vice versa

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    // Create the methods in the values in the app.jsx so these methods will directly render those functions
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
