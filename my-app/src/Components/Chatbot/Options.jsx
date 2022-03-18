import React from "react";
import "./quiz.css";
function Options(props) {
  const data = [
    {
      text: "Python",
      handler: props.actionProvider.handlePythonQuiz,
      id: 1
    },
    {
      text: "Docker",
      handler: props.actionProvider.handleDockerQuiz,
      id: 2
    },
    {
      text: "SQL",
      handler: props.actionProvider.handleSqlQuiz,
      id: 3
    }
  ];
  const optionsList = data.map((option) => (
    <button key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));
  return (
    <div>
      <p>{optionsList}</p>
    </div>
  );
}
export default Options;
