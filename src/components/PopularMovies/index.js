import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class PopularMovies extends Component {
  state = {
    popList: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popList: updatedData,
      })
    }
  }

  renderSuccessView = () => {
    const {popList} = this.state
    const styleUl = {
      display: 'flex',
      justifyContent: 'flex-start',
    }
    return (
      <div className="main-container-pop-movies">
        <Header triggerSearchBtn={this.triggerSearchBtn} />
        <div className="search-items">
          <ul style={styleUl} className="each-similar-movie-ul">
            {popList.map(each => {
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
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return <>{this.renderSuccessView()}</>
  }
}

export default PopularMovies
