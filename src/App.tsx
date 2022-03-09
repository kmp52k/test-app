import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";

function App() {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql<any>(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Todo client app</p>
      </header>
      <div style={styles.container as any}>
        {todos.map((todo: any, index: number) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>Name: {todo.name}</p>
            <p style={styles.todoDescription}>
              Description: {todo.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: 400,
    margin: "5px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: '8px 16px',
    textAlign: "left",
    border: "1px solid",
  },
  todo: { margin: 0 },
  todoName: { fontSize: 20, fontWeight: "bold", margin: 0, marginBottom: 4 },
  todoDescription: { margin: 0 },
};

export default App;
