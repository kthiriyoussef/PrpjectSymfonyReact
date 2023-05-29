import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Homee = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://127.0.0.1:8000/api/questions/${params.id}`
      );
      const data = await response.json();
      setQuestion(data);

      if (data.answers.length > 0) {
        const answerPromises = data.answers.map(async (answerUrl) => {
          const url = "https://127.0.0.1:8000" + answerUrl;
          const answerResponse = await fetch(url);

          if (!answerResponse.ok) {
            throw new Error("Failed to fetch answer");
          }

          const answerData = await answerResponse.json();
          return answerData;
        });

        const fetchedAnswers = await Promise.all(answerPromises);
        setAnswers(fetchedAnswers);
      }
    } catch (error) {
      console.log(error);
      // Handle the error gracefully, e.g., show an error message
    }
  };
  const aa = async () => {
    navigate("/");
  };

  const submitAnswer = async () => {
    try {
      const response = await fetch("https://127.0.0.1:8000/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: answerText,
          answerDate: "2023-05-16T10:15:10+00:00",
          questions: `/api/questions/${params.id}`,
        }),
      });

      if (response.ok) {
        // Answer submission successful
        setAnswerText(""); // Clear the answer text
        fetchData(); // Fetch the updated list of answers
      } else {
        throw new Error("Failed to submit answer");
      }
    } catch (error) {
      console.log(error);
      // Handle the error gracefully, e.g., show an error message
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded p-4 mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {question && question.question}
        </h1>
        <div className="border-t border-gray-200 pt-4">
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className="mb-4">
                <p className="text-lg">{answer.answer}</p>
              </div>
            ))
          ) : (
            <p>No answers yet.</p>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h1 className="text-2xl font-bold mb-4">Your Answer</h1>
        <textarea
          className="w-full p-2 mb-4 rounded"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Enter your answer..."
          rows={6}
        ></textarea>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={submitAnswer}
        >
          Submit Answer
        </button>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4
          "
          onClick={aa}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default Homee;
