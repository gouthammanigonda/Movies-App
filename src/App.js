import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
)

export default App
