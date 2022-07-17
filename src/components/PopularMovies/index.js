import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../Loader'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {
    popList: [],
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiConstant.inProgress})
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
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstant.failure,
      })
    }
  }

  renderAllItems = () => {
    const {popList} = this.state
    const styleUl = {
      display: 'flex',
      justifyContent: 'flex-start',
    }
    return (
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
    )
  }

  renderSuccessView = () => (
    <div className="main-container-pop-movies">
      <Header triggerSearchBtn={this.triggerSearchBtn} />
      <div className="search-items">{this.renderViews()}</div>
      <Footer />
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-pop">
      <LoaderSpinner />
    </div>
  )

  onClickTryAgain = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => (
    <div className="loader-pop">
      <div className="warning-content">
        <img
          src="https://res.cloudinary.com/gouthamchintu/image/upload/v1658087801/Movies%20App/Background-Complete_iticsm.png"
          alt="failure-img"
          className="failure-image"
        />
        <p className="warning-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          onClick={this.onClickTryAgain}
          className="try-again"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.failure:
        return this.renderFailureView()
      case apiConstant.success:
        return this.renderAllItems()
      case apiConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSuccessView()}</>
  }
}

export default PopularMovies
