import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <div className="footer-icons-container">
      <div className="ho1">
        <FaGoogle className="footer-icon a" />
      </div>
      <div className="ho2">
        <FaTwitter className="footer-icon b" />
      </div>
      <div className="ho3">
        <FaInstagram className="footer-icon c" />
      </div>
      <div className="ho4">
        <FaYoutube className="footer-icon d" />
      </div>
    </div>
    <p className="footer-para">Contact Us</p>
  </div>
)

export default Footer
