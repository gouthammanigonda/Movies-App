import './index.css'

const PageNotFound = props => {
  const style = {
    backgroundImage: `url(https://res.cloudinary.com/gouthamchintu/image/upload/v1658130034/Movies%20App/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_kul08w.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    height: '100vh',
  }

  const onClickGotoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div style={style} className="page-not-found">
      <div className="no-found-content">
        <h1 className="n-f-heading">Lost Your Way ?</h1>
        <p className="n-f-para">
          we are sorry the page you requested could not be found
          <br />
          Please go back to the homepage.
        </p>
        <div className="btn-cont">
          <button type="button" className="n-f-btn" onClick={onClickGotoHome}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
