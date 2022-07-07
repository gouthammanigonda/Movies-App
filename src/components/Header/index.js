import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

class Header extends Component {
  render() {
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
          <p className="header-links">Home</p>
          <p className="header-links">Popular</p>
        </div>
        <div className="header-search-profile-container">
          <div className="search-input-header">
            <input type="search" className="header-search-input" />
            <button type="button" className="search-button">
              <HiOutlineSearch className="header-search-icon" />
            </button>
          </div>
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
