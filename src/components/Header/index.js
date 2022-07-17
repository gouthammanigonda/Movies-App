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

  onClickSearchContainer = () => {}

  onClickSearchBtn = () => {
    const {searchIp} = this.state
    const {triggerSearchBtn} = this.props
    triggerSearchBtn(searchIp)
  }

  onClickInput = () => {
    const {setButtonDisable} = this.props
    setButtonDisable()
  }

  render() {
    const {searchIp} = this.state
    const {searchBtnClicked} = this.props
    console.log(searchBtnClicked, 'feader component')
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
            <p className="link-text">Home</p>
          </Link>
          <Link to="/popular" className="header-links">
            <p className="link-text">Popular</p>
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
                onClick={this.onClickInput}
              />
              <button
                type="button"
                onClick={this.onClickSearchBtn}
                className="search-button"
                disabled={!searchBtnClicked}
              >
                <HiOutlineSearch className="header-search-icon" />
              </button>
            </div>
          </Link>
          <div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/gouthamchintu/image/upload/v1657160811/Movies%20App/Group_lonren.jpg"
                alt="profile"
                className="header-profile-image"
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
