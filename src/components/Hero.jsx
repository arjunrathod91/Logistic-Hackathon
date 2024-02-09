import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
import { useEffect } from 'react'

const Hero = () => {
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify([]))
    localStorage.setItem('request',JSON.stringify([]))
    localStorage.setItem('volunteer',JSON.stringify([]))
  },)
    return(
         <>
           <div className ='container d-flex flex-column justify-content-center align-items-center' style={{paddingTop:"100px"}}>
              <img src={logo} alt="" className='circle'/>
               <div className="text-center">
                 <h4 className="fw-bold">HelpYours!</h4>
                  <p className="heroparagraph">Your help is our priority</p>
               </div>
               <div className="herobtnparent">
                <Link to="/chooseauth"><button className="herobtn">Get Started</button></Link> 
               </div>
           
           </div>
         </>
    )
}


export default Hero;