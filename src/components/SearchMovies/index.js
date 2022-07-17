import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

import('typeface-hk-grotesk')

class SearchMovies extends Component {
  state = {
    searchList: [],
    searchBtnClicked: false,
    searchIp: '',
    noResults: false,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async searchIp => {
    console.log(searchIp, 'search get')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchIp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      if (data.results.length === 0) {
        this.setState({
          searchIp,
          noResults: true,
        })
      } else {
        console.log(data)
        const updatedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }))
        this.setState({
          searchList: updatedData,
          noResults: false,
        })
      }
    } else {
      this.setState({
        noResults: true,
      })
    }
  }

  triggerSearchBtn = searchIp => {
    this.getSearchMovies(searchIp)
    this.setState(
      {
        searchBtnClicked: true,
      },
      this.getSearchMovies,
    )
  }

  showNoResultsFound = () => {
    const {searchIp} = this.state
    return (
      <div className="no-results-container">
        <img
          src="https://res.cloudinary.com/gouthamchintu/image/upload/v1658041634/Movies%20App/Group_7394_suelmd.png"
          alt="no movies"
          className="no-results"
        />
        <p className="no-results-para">
          Your search for {searchIp} did not find any matches.
        </p>
      </div>
    )
  }

  showResults = () => {
    const {searchList} = this.state
    const styleUl = {
      display: 'flex',
      justifyContent: 'flex-start',
    }
    return (
      <ul style={styleUl} className="each-similar-movie-ul">
        {searchList.map(each => {
          const {backdropPath, id, title} = each
          return (
            <li key={id} className="each-similar-list-item">
              <Link to={`/movies/${id}`}>
                <img
                  src={backdropPath}
                  alt={title}
                  className="each-similar-image"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  renderSearchItems = () => {
    const {noResults} = this.state
    return noResults ? this.showNoResultsFound() : this.showResults()
  }

  renderSearchMoviesView = () => {
    const {searchBtnClicked} = this.state
    return (
      <div className="main-container-pop-movies">
        <Header triggerSearchBtn={this.triggerSearchBtn} />
        <div className="search-items">
          {!searchBtnClicked ? '' : this.renderSearchItems()}
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return <div>{this.renderSearchMoviesView()}</div>
  }
}

export default SearchMovies
