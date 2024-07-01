import React from 'react'
import "./Contact.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GoogleIcon from '@mui/icons-material/Google';

const Contact = () => {
  return (
    <div className='contact'>
        <div className="wrapper">
            <span>BE IN TOUCH WITH US:</span>
            <div className="mail">
                <input type="text" placeholder='Enter Your Email' />
                <button>JOIN US</button>
            </div>
            <div className="icons">
                <FacebookIcon />
                <InstagramIcon />
                <XIcon />
                <GoogleIcon />
                <PinterestIcon />
            </div>
        </div>
    </div>
  )
}

export default Contact