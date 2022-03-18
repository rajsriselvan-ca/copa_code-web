import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';
import ProjectDashBoard from './Components/project-dashboard';
import ChatRender from './Components/Chatbot/index';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path = '/' element = {<ProjectDashBoard />}/>
      <Route path = '/chat' element = {<ChatRender />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
