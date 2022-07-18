import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    showErrorMsg: false,
    errorMsg: '',
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props

      const Datatoken = data.jwt_token
      Cookies.set('jwt_token', Datatoken, {expires: 30})
      Cookies.set('username', username, {expires: 30})
      Cookies.set('password', password, {expires: 30})
      history.replace('/')
      this.setState({
        showErrorMsg: false,
        errorMsg: '',
      })
    } else {
      const errorMessage = data.error_msg
      this.setState({
        showErrorMsg: true,
        errorMsg: errorMessage,
      })
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="sub-container-login">
          <div>
            <img
              src="https://res.cloudinary.com/gouthamchintu/image/upload/v1656954824/Movies%20App/Group_7399_icxhz5.png"
              alt="login website logo"
              className="login-image"
            />
          </div>
          <div className="flex-container">
            <form className="login-form" onSubmit={this.onClickLogin}>
              <p className="form-heading">Login</p>
              <div className="login-input">
                <label className="login-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  placeholder="Username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="login-input">
                <label className="login-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="login-button" type="submit">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
