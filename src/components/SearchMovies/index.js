import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import LoaderSlider from '../Loader'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    searchList: [],
    searchBtnClicked: false,
    searchIp: '',
    apiStatusSearch: apiConstant.initial,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async searchIp => {
    this.setState({
      apiStatusSearch: apiConstant.inProgress,
    })

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
          apiStatusSearch: apiConstant.failure,
        })
      } else {
        const updatedData = data.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }))
        this.setState({
          searchList: updatedData,
          apiStatusSearch: apiConstant.success,
        })
      }
    }
  }

  setButtonDisable = () => {
    this.setState({
      searchBtnClicked: true,
    })
  }

  triggerSearchBtn = searchIp => {
    this.getSearchMovies(searchIp)
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
        <p className="guid-para">
          Your search for <span className="span-ele-guid">{searchIp}</span> did
          not find any matches.
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

  renderLoaderView = () => (
    <div className="loader-view ">
      <LoaderSlider />
    </div>
  )

  renderSearchItems = () => {
    const {apiStatusSearch} = this.state
    switch (apiStatusSearch) {
      case apiConstant.failure:
        return this.showNoResultsFound()
      case apiConstant.inProgress:
        return this.renderLoaderView()
      case apiConstant.success:
        return this.showResults()
      default:
        return null
    }
  }

  renderSearchGuid = () => (
    <div className="guid-container">
      <h1 className="guid-heading">Search Guid :</h1>
      <p className="guid-para">
        Enter the movie name you want to get in,{' '}
        <span className="span-ele-guid"> Header search </span>
        section.
      </p>
    </div>
  )

  renderSearchMoviesView = () => {
    const {searchBtnClicked} = this.state
    console.log(searchBtnClicked, 'search component')
    return (
      <div className="main-container-pop-movies">
        <Header
          triggerSearchBtn={this.triggerSearchBtn}
          searchBtnClicked={searchBtnClicked}
          setButtonDisable={this.setButtonDisable}
        />
        <div className="search-items">
          {!searchBtnClicked
            ? this.renderSearchGuid()
            : this.renderSearchItems()}
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
