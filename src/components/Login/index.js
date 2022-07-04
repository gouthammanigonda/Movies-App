import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
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
    console.log(data)
    if (response.ok) {
      const {history} = this.props

      const token = data.jwt_token
      Cookies.set('jwt_token', token, {expires: 30})

      history.replace('/')
      this.setState({
        showErrorMsg: false,
        errorMsg: '',
      })
    } else {
      const errorMsg = data.error_msg
      this.setState({
        showErrorMsg: true,
        errorMsg,
      })
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    return (
      <div>
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
      </div>
    )
  }
}

export default Login
