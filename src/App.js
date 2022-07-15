import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import MovieItemDetails from './components/MovieItemDetails'
import './App.css'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/movies/:id" component={MovieItemDetails} />
    </Switch>
  </div>
)

export default App
