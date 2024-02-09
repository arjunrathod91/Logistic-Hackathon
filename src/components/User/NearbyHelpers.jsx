import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../Contexts/AllContext';

function NearbyHelpers() {

  const { voldata, setVolData,requestData, setRequestData} = useContext(MyContext)
  const [nearbyVol, setNearbyVol] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('volunteer'))
    console.log(obj)
    setNearbyVol(obj)
  },[requestData])

  const clickVol = (e, item) => {
    e.preventDefault()
    console.log('clicked')
    console.log(item.id)
    const userId = item.id
    const data = JSON.parse(localStorage.getItem('volunteer'))
    const dataItem = data.find(data=>data.id == userId)
    console.log(dataItem)
    setVolData(dataItem)
    navigate('/volunteerprofile')
  }


  return (
    <div className="container">
      <Header />
      <h4>Nearby Helpers</h4>
      <div className="row container-fluid">
        {nearbyVol.map((item) => (
          <div className="col-lg-4 col-md-6 mb-4 " onClick={(e)=>clickVol(e,item)}>
            <div className="card custom-card">
              <div className="card-body bg-secondary d-flex gap-5" style={{ backgroundColor: "#D9D9D9" }}>
                <div className="circle custom-circle flex-2 ml-3"><img src={item.profile} alt="" /></div>
                <div className='flex-1'>
                <p className="card-title mb-1"><span className='fw-bold'>Name:</span>{item.username}</p>
                <p className="card-text mb-1"><span className='fw-bold'>Service:</span>{item.area}</p>
                <p className="card-text"><span className='fw-bold'>Location:</span>{item.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyHelpers;
