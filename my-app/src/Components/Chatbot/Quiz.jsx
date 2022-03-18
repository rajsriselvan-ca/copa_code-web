import React, { useEffect, useState } from "react";
// import Loading from "./Loading";
import RenderQuiz from "./RenderQuiz";
import "./quiz.css";


function Quiz(props) {
    //   const [loading, setLoading] = useState(true);
    const [python, setPython] = useState([]);
    //   const [sql, setSql] = useState([]);
    //   const [docker, setDocker] = useState([]);
    const questions = [{
        id: 1,
        question: "What is Python?",
        answers: {
            answer_a: "It is a Math",
            answer_b: "It is a Programming Language",
            answer_c: "It is a Chemical Substance",
        },
        correct_answers: {
            answer_a_correct: false,
            answer_b_correct: true,
            answer_c_correct: false
        }
    },
    {
        id: 2,
        question: "Select a common Builtin data type in Python",
        answers: {
            answer_a: "select()",
            answer_b: "null()",
            answer_c: "type()",
        },
        correct_answers: {
            answer_a_correct: false,
            answer_b_correct: false,
            answer_c_correct: true
        }
    },
    ]

    const loadPython = async () => {
        setPython(questions);
    };
    useEffect(() => {
        loadPython();
    }, []);

    // const loadDocker = async () => {
    //     setPython(questions);
    // };
    // useEffect(() => {
    //     loadDocker();
    // }, []);

    // const loadSql = async () => {
    //     setPython(questions);
    // };
    // useEffect(() => {
    //     loadSql();
    // }, []);


    if (python.length === 0) {
        if (props.course === "Python")
            return <button onClick={loadPython}>Refresh</button>;
        // else if (props.course === "Docker")
        //   return <button onClick={loadDocker}>Refresh</button>;
        // else return <button onClick={loadSql}>Refresh</button>;
    } else {
        if (props.course === "Python") {
            return <RenderQuiz data={python} />;
        }
        // else if (props.course === "Docker") return <RenderQuiz data={docker} />;
        // else return <RenderQuiz data={sql} />;
    }
}
export default Quiz;
