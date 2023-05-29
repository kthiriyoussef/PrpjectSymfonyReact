import React, { useState, useEffect } from "react";

function Test() {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://127.0.0.1:8000/api/questions/7");
      const data = await response.json();
      setQuestion(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      {question && (
        <div>
          <h1>{question.question}</h1>
          <p>Created on {question.createDate}</p>
        </div>
      )}
    </div>
  );
}

export default Test;
