import React, { useState, useEffect } from "react";
import "./styles.css";
import Homee from "./Home";
import { Link } from "react-router-dom";
const TodoApp = () => {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/questions")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setMessageList(data["hydra:member"]);
      });
  }, []);

  const addTodo = (message) => {
    fetch("https://127.0.0.1:8000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        createDate: "2023-05-14T11:06:43+00:00",
        answers: [],
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to create question");
        }
      })
      .then((data) => {
        console.log("API response:", data);
        setMessageList([
          ...messageList,
          {
            id: data.id, // add the message ID to the state
            question: data.question,
          },
        ]);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const deleteTodo = (messageId) => {
    // pass the message ID as argument
    fetch(`https://127.0.0.1:8000/api/questions/${messageId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Question deleted successfully!");
          setMessageList(messageList.filter((m) => m.id !== messageId)); // remove the message from the state
        } else {
          throw new Error("Failed to delete question");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };
  return (
    <div id="app">
      <TodoHeader />
      <TodoForm addTodo={addTodo} /> <br />
      <TodoList messageList={messageList} deleteTodo={deleteTodo} />
    </div>
  );
};

const TodoHeader = () => (
  <div id="header">
    <h2>Questions List</h2>
  </div>
);

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    addTodo(input);
    setInput("");
  };

  return (
    <div id="form">
      <input
        id="form__input"
        type="text"
        value={input}
        onChange={changeHandler}
      />
      <button id="form__submit" onClick={submitHandler}>
        Add Question
      </button>
    </div>
  );
};

const TodoList = ({ messageList, deleteTodo }) => (
  <table class="table-fixed border-spacing-9">
    <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {messageList.map((message) => (
        <Todo
          message={message.question}
          id={message.id}
          deleteTodo={() => deleteTodo(message.id)}
          key={message.id}
        />
      ))}{" "}
    </tbody>
  </table>
);

export const Todo = ({ message, id, deleteTodo }) => {
  const handleSubmit = (event) => {
    deleteTodo(message);
  };

  return (
    <>
      <tr>
        <td>{message}</td>
        <td>
          <button onClick={handleSubmit}>Delete</button>
        </td>
        <td>
          <Link to={"/Home/" + id}>
            <button>Answer</button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export function New() {
  return <TodoApp />;
}
