import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import {AiOutlineWarning} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import Loader from '../Loader'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    trendingList: [],
    topRatedList: [],
    originalList: [],
    randomItem: [],
    apiStatusTrending: apiConstant.initial,
    apiStatusTopRated: apiConstant.initial,
    apiStatusOriginal: apiConstant.initial,
  }

  componentDidMount() {
    this.getTrendingNowMovies()
    this.getOriginals()
    this.getTopRatedMovies()
  }

  getTrendingNowMovies = async () => {
    this.setState({apiStatusTrending: apiConstant.inProgress})
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

      const updatedList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      const len = updatedList.length
      const randomItem = updatedList[Math.floor(Math.random() * len)]
      this.setState({
        trendingList: updatedList,
        randomItem,
        apiStatusTrending: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatusTrending: apiConstant.failure,
      })
    }
  }

  getTopRatedMovies = async () => {
    this.setState({
      apiStatusTopRated: apiConstant.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        topRatedList: updatedData,
        apiStatusTopRated: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatusTopRated: apiConstant.failure,
      })
    }
  }

  getOriginals = async () => {
    this.setState({
      apiStatusOriginal: apiConstant.inProgress,
    })
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

      const updatedList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        originalList: updatedList,
        apiStatusOriginal: apiConstant.success,
      })
    } else {
      this.setState({
        apiStatusOriginal: apiConstant.failure,
      })
    }
  }

  renderPosterInfo = (title, overview) => (
    <div>
      <h1 className="poster-heading">{title}</h1>
      <p className="poster-para">{overview}</p>
      <button className="button-poster" type="button">
        Play
      </button>
    </div>
  )

  renderLoaderPoster = () => (
    <div className="loader-container-poster">
      <Loader />
    </div>
  )

  renderPosterViewHome = () => {
    const {randomItem, apiStatusTrending} = this.state
    const {overview, posterPath, title} = randomItem

    const style = {
      backgroundImage: `url(${posterPath})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      height: '80vh',
    }

    return (
      <div style={style} className="home-poster">
        <Header />
        <div className="linear-gradient">
          <div className="poster-container">
            {(() => {
              switch (apiStatusTrending) {
                case apiConstant.failure:
                  return this.renderFailureViewTrending()
                case apiConstant.success:
                  return this.renderPosterInfo(title, overview)
                case apiConstant.inProgress:
                  return this.renderLoaderPoster()
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
    )
  }

  slickSlider = item => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <Slider {...settings}>
        {item.map(each => {
          const {backdropPath, id, title} = each
          return (
            <Link to={`/movies/${id}`}>
              <li className="list-item" key={id}>
                <img src={backdropPath} alt={title} className="each-img-home" />
              </li>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderLoaderView = () => (
    <div className="loader">
      <Loader />
    </div>
  )

  onClickTryAgainTopRated = () => {
    this.getTopRatedMovies()
  }

  renderFailureViewTopRated = () => (
    <div className="loader">
      <div className="warning-content">
        <AiOutlineWarning className="warning-icon" />
        <p className="warning-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again"
          onClick={this.onClickTryAgainTopRated}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  onClickTryAgainTrending = () => {
    this.getTrendingNowMovies()
  }

  renderFailureViewTrending = () => (
    <div className="loader">
      <div className="warning-content">
        <AiOutlineWarning className="warning-icon" />
        <p className="warning-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again"
          onClick={this.onClickTryAgainTrending}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  onClickTryAgainOriginal = () => {
    this.getOriginals()
  }

  renderFailureViewOriginal = () => (
    <div className="loader">
      <div className="warning-content">
        <AiOutlineWarning className="warning-icon" />
        <p className="warning-msg">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again"
          onClick={this.onClickTryAgainOriginal}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSecondSection = () => {
    const {
      trendingList,
      originalList,
      topRatedList,
      apiStatusTrending,
      apiStatusTopRated,
      apiStatusOriginal,
    } = this.state
    return (
      <div className="second-session-home">
        <div className="trending-container">
          <h1 className="each-ul-heading">Trending Now</h1>
          <ul className="unordered-list">
            {(() => {
              switch (apiStatusTrending) {
                case apiConstant.failure:
                  return this.renderFailureViewTrending()
                case apiConstant.inProgress:
                  return this.renderLoaderView()
                case apiConstant.success:
                  return this.slickSlider(trendingList)
                default:
                  return null
              }
            })()}
          </ul>
        </div>
        <div className="trending-container">
          <h1 className="each-ul-heading">Top Rated</h1>
          <ul className="unordered-list">
            {(() => {
              switch (apiStatusTopRated) {
                case apiConstant.failure:
                  return this.renderFailureViewTopRated()
                case apiConstant.inProgress:
                  return this.renderLoaderView()
                case apiConstant.success:
                  return this.slickSlider(topRatedList)
                default:
                  return null
              }
            })()}
          </ul>
        </div>
        <div className="original-container">
          <h1 className="each-ul-heading">Originals</h1>
          <ul className="unordered-list">
            {(() => {
              switch (apiStatusOriginal) {
                case apiConstant.failure:
                  return this.renderFailureViewOriginal()
                case apiConstant.inProgress:
                  return this.renderLoaderView()
                case apiConstant.success:
                  return this.slickSlider(originalList)
                default:
                  return null
              }
            })()}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {trendingList, originalList} = this.state

    return (
      <div className="main-container-home">
        {this.renderPosterViewHome()}
        {this.renderSecondSection()}
        <Footer />
      </div>
    )
  }
}

export default Home
