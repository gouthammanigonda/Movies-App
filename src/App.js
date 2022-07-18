import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MovieItemDetails from './components/MovieItemDetails'
import SearchMovies from './components/SearchMovies'
import PopularMovies from './components/PopularMovies'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './components/PageNotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
        <ProtectedRoute exact path="/search" component={SearchMovies} />
        <ProtectedRoute exact path="/popular" component={PopularMovies} />
        <ProtectedRoute exact path="/account" component={Account} />
        <Route path="/page-not-found" component={PageNotFound} />
        <Redirect to="/page-not-found" />
      </Switch>
    )
  }
}

export default App
