import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    searchIp: '',
  }

  onChangeInput = event => {
    this.setState({
      searchIp: event.target.value,
    })
  }

  onClickSearchBtn = () => {
    const {searchIp} = this.state
    const {triggerSearchBtn} = this.props
    triggerSearchBtn(searchIp)
  }

  render() {
    const {searchIp} = this.state
    return (
      <div className="header-main-container">
        <div className="header-links-container">
          <div>
            <img
              src="https://res.cloudinary.com/gouthamchintu/image/upload/v1656954824/Movies%20App/Group_7399_icxhz5.png"
              alt="website logo"
              className="header-image"
            />
          </div>
          <Link to="/" className="header-links">
            <p>Home</p>
          </Link>
          <Link to="/popular" className="header-links">
            <p>Popular</p>
          </Link>
        </div>
        <div className="header-search-profile-container">
          <Link to="/search">
            <div className="search-input-header">
              <input
                type="search"
                value={searchIp}
                className="header-search-input"
                onChange={this.onChangeInput}
              />
              <button
                type="button"
                onClick={this.onClickSearchBtn}
                className="search-button"
              >
                <HiOutlineSearch className="header-search-icon" />
              </button>
            </div>
          </Link>
          <div>
            <img
              src="https://res.cloudinary.com/gouthamchintu/image/upload/v1657160811/Movies%20App/Group_lonren.jpg"
              alt="profile"
              className="header-profile-image"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Header
