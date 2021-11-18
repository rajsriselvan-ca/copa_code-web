import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/login-form';
import ProjectDashBoard from './Components/project-dashboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route path = '/' component = {Login} exact/>
      <Route path = '/dashboard' component = {ProjectDashBoard}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}
export default App;
