import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Home extends Component {
  componentDidMount() {
    this.getTrendingNowMovies()
    this.getOriginals()
  }

  getTrendingNowMovies = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(updatedList)
    }
  }

  getOriginals = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(updatedList)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
}

export default Home
