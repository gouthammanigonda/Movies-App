import Cookies from 'js-cookie'

import {withRouter, Redirect} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const username = Cookies.get('username')
  const password = Cookies.get('password')
  if (username === undefined || password === undefined) {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="main-container-pop-movies">
      <Header />
      <div className="account-items">
        <h1 className="account-main-heading">Account</h1>
        <hr className="hr-line" />
        <div className="account-details">
          <div className="flex-info">
            <p className="key">Member ship</p>
          </div>
          <div className="flex-info-2">
            <p className="value">{username}@gmail.com</p>
            <div className="password-flex">
              <p className="key margin-top">Password</p>
              <p className="value margin-top">
                {' '}
                : {'*'.repeat(password.length)}
              </p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details">
          <div className="flex-info">
            <p className="key">Plan details</p>
          </div>
          <div className="flex-info-2">
            <div className="plan-flex">
              <p className="value">Premium</p>
              <p className="border-box-para margin-left">Ultra HD</p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="login-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(Account)
