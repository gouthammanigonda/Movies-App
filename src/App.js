import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MovieItemDetails from './components/MovieItemDetails'
import SearchMovies from './components/SearchMovies'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/:id" component={MovieItemDetails} />
        <Route exact path="/search" component={SearchMovies} />
      </Switch>
    )
  }
}

export default App
