import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import {AiOutlineWarning} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import LoaderSpinner from '../Loader'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: [],
    genre: [],
    language: [],
    similarMovies: [],
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({
      apiStatus: apiConstant.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData1 = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseData: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies,
        spokenLanguages: data.movie_details.spoken_languages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const genre = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const language = data.movie_details.spoken_languages.map(each => ({
        englishName: each.english_name,
        id: each.id,
      }))
      const similarMovies = data.movie_details.similar_movies.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        movieDetails: updatedData1,
        language,
        genre,
        similarMovies,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstant.failure,
      })
    }
  }

  onClickTryAgain = () => {
    this.getMovieItemDetails()
  }

  renderFailureView = () => (
    <div className="view-container-main-container">
      <Header />
      <div className="view-container">
        <div className="warning-content">
          <AiOutlineWarning className="warning-icon each-icon" />
          <p className="warning-msg each-para">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="try-again each-btn"
            onClick={this.onClickTryAgain}
          >
            Try Again
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )

  renderLoaderView = () => (
    <div className="view-container-main-container">
      <Header />
      <div className="view-container">
        <div className="warning-content">
          <LoaderSpinner />
        </div>
      </div>
      <Footer />
    </div>
  )

  renderEachMovieDetails = () => {
    const {movieDetails, language, similarMovies, genre} = this.state
    const {
      adult,
      budget,
      overview,
      posterPath,
      releaseData,
      runtime,
      title,
      voteAverage,
      voteCount,
    } = movieDetails

    const date = new Date(releaseData)
    const hour = Math.floor(runtime / 60)
    const min = runtime % 60
    const day = date.getDay().toString()
    let daytag
    switch (day.endsWith()) {
      case '1':
        daytag = 'st'
        break
      case '2':
        daytag = 'nd'
        break
      case '3':
        daytag = 'rd'
        break
      default:
        daytag = 'th'
    }
    const month = date.toLocaleString('default', {month: 'long'})
    const year = date.getFullYear().toString()

    const style = {
      backgroundImage: `url(${posterPath})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      height: '80vh',
    }

    console.log(similarMovies)

    return (
      <div className="movie-item-details">
        <div style={style} className="home-poster ">
          <div className="linear-gradient2 ">
            <div className="left-grading">
              <Header />
              <div className="linear-gradient-side-left">
                <h1 className="poster-heading">{title}</h1>
                <div className="small-info">
                  <p className="poster-para">{`${hour}h ${min}m`}</p>
                  <p className="poster-para adult">{adult ? ' A' : ' U/A'}</p>
                  <p className="poster-para">{year}</p>
                </div>
                <p className="poster-para">{overview}</p>
                <button className="button-poster" type="button">
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="section-two-details">
          <div className="detailed-info">
            <div className="each-details">
              <h1 className="highlighter">Genres</h1>
              {genre.map(each => (
                <p key={each.id} className="each-detail-para">
                  {each.name}
                </p>
              ))}
            </div>
            <div className="each-details">
              <h1 className="highlighter">Audio Available</h1>
              {language.map(each => (
                <p key={each.id} className="each-detail-para">
                  {each.englishName}
                </p>
              ))}
            </div>
            <div className="each-details">
              <div>
                <h1 className="highlighter">Rating Count</h1>
                <p className="each-detail-para">{voteCount}</p>
              </div>
              <div>
                <h1 className="highlighter">Average Rating</h1>
                <p className="each-detail-para">{voteAverage}</p>
              </div>
            </div>
            <div className="each-details">
              <div>
                <h1 className="highlighter">Budget </h1>
                <p className="each-detail-para">{budget}</p>
              </div>
              <div>
                <h1 className="highlighter">Release Date</h1>
                <p className="each-detail-para">{`${day}${daytag} ${month} ${year}`}</p>
              </div>
            </div>
          </div>
          <div className="more-movies-session">
            <h1 className="more-movies-heading">More like this</h1>
            <ul className="each-similar-movie-ul">
              {similarMovies.map(each => (
                <li key={each.id} className="each-similar-list-item">
                  <Link to={`/movies/${each.id}`} target="_blank">
                    <img
                      src={each.backdropPath}
                      alt={each.title}
                      className="each-similar-image"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.failure:
        return this.renderFailureView()
      case apiConstant.success:
        return this.renderEachMovieDetails()
      case apiConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderViews()}</div>
  }
}

export default withRouter(MovieItemDetails)
