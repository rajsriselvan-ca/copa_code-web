import React, { useEffect, useState } from "react";
import RenderQuiz from "./RenderQuiz";
import  {PythonQuestions, NodeJsQuestion, SQLQuestions} from './Questions';
import "./quiz.css";


function Quiz(props) {
    const [python, setPython] = useState([]);
      const [sql, setSql] = useState([]);
      const [node, setNode] = useState([]);

    const loadPython = async () => {
        setPython(PythonQuestions);
    };
    useEffect(() => {
        loadPython();
    }, []);

    const loadNodeJS = async () => {
        setNode(NodeJsQuestion);
    };
    useEffect(() => {
        loadNodeJS();
    }, []);

    const loadSql = async () => {
        setSql(SQLQuestions);
    };
    useEffect(() => {
        loadSql();
    }, []);


    if (python.length === 0) {
        if (props.course === "Python")
            return <button onClick={loadPython}>Refresh</button>;
        else if (props.course === "NodeJS")
          return <button onClick={loadNodeJS}>Refresh</button>;
        else return <button onClick={loadSql}>Refresh</button>;
    } else {
        if (props.course === "Python") {
            return <RenderQuiz data={python} />;
        }
        else if (props.course === "NodeJS") return <RenderQuiz data={node} />;
        else return <RenderQuiz data={sql} />;
    }
}
export default Quiz;
