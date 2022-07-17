import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

class Home extends Component {
  state = {
    trendingList: [],
    topRatedList: [],
    originalList: [],
    randomItem: [],
  }

  componentDidMount() {
    this.getTrendingNowMovies()
    this.getOriginals()
    this.getTopRatedMovies()
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
      })
    }
  }

  getTopRatedMovies = async () => {
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
      })
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

      const updatedList = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        originalList: updatedList,
      })
    }
  }

  renderPosterViewHome = () => {
    const {randomItem} = this.state
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
            <h1 className="poster-heading">{title}</h1>
            <p className="poster-para">{overview}</p>
            <button className="button-poster" type="button">
              Play
            </button>
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

  renderSecondSection = () => {
    const {trendingList, originalList, topRatedList} = this.state
    return (
      <div className="second-session-home">
        <div className="trending-container">
          <h1 className="each-ul-heading">Trending Now</h1>
          <ul className="unordered-list">{this.slickSlider(trendingList)}</ul>
        </div>
        <div className="trending-container">
          <h1 className="each-ul-heading">Top Rated</h1>
          <ul className="unordered-list">{this.slickSlider(topRatedList)}</ul>
        </div>
        <div className="original-container">
          <h1 className="each-ul-heading">Originals</h1>
          <ul className="unordered-list">{this.slickSlider(originalList)}</ul>
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
