import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const QuestionsPage = () => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        setQuestionList(data["hydra:member"]);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const addQuestion = (question) => {
    fetch("https://127.0.0.1:8000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
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
        setQuestionList([
          ...questionList,
          {
            id: data.id,
            question: data.question,
          },
        ]);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const deleteQuestion = (questionId) => {
    fetch(`https://127.0.0.1:8000/api/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Question deleted successfully!");
          setQuestionList(questionList.filter((q) => q.id !== questionId));
        } else {
          throw new Error("Failed to delete question");
        }
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded p-4 mb-8">
        <h1 className="text-3xl font-bold mb-4">Questions List</h1>
        <div className="border-t border-gray-200 pt-4">
          {questionList.length > 0 ? (
            <ol className="list-decimal pl-6">
              {questionList.map((question) => (
                <Question
                  question={question.question}
                  id={question.id}
                  deleteQuestion={() => deleteQuestion(question.id)}
                  key={question.id}
                />
              ))}
            </ol>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </div>
      <QuestionForm addQuestion={addQuestion} />
    </div>
  );
};

const Question = ({ question, id, deleteQuestion }) => {
  const handleDelete = () => {
    deleteQuestion(id);
  };

  return (
    <li className="flex items-center justify-between py-2">
      <span className="text-lg">{question}</span>
      <div>
        <button
          className="bg-red-600 text-white py-2 px-4 ml-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link to={`/Home/${id}`}>
          <button className="bg-blue-600 text-white py-2 px-4 ml-4 rounded">
            Answer
          </button>
        </Link>
      </div>
    </li>
  );
};

const QuestionForm = ({ addQuestion }) => {
  const [question, setQuestion] = useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (question.trim() === "") {
      return;
    }
    addQuestion(question);
    setQuestion("");
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4">Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleChange}
          placeholder="Enter your question..."
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default QuestionsPage;
