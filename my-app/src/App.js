import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProjectDashBoard from './Components/project-dashboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route path = '/' component = {ProjectDashBoard}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}
export default App;
