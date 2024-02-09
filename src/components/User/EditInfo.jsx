import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate, json, useNavigate } from 'react-router-dom'
import { MyContext } from '../../Contexts/AllContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png'

const EditInfo = () => {
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)

  const { userData, setUserData } = useContext(MyContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const userId = userData.id

  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
        const userDetail = JSON.parse(localStorage.getItem('user'))
        console.log(userDetail)
        const findIdx = userDetail.findIndex(item=>item.id == userId)
        const updateData = {
          'username':username,
          'email':email,
          'password':password,
          'contact':contact,
          'location':location
        }
        userDetail[findIdx] = updateData
        localStorage.setItem('user', JSON.stringify(userDetail));
        setUserData(updateData)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          navigate('/userprofile')
        }, 3000)
  }
  return (
    <div className="d-flex container-fluid vh-100 flex-column justify-content-center align-items-center">
      <div className={success ? 'alert alert-success w-[300px] text-center' : 'd-none'} role="alert">
      <FontAwesomeIcon icon={faCircleCheck} className='mr-3'/>Information Saved Successfully
      </div>
      <div className={failed ? 'alert alert-danger w-[300px] text-center' : 'd-none'} role="alert">
      <FontAwesomeIcon icon={faCircleXmark} className='mr-3'/>Failed to Save
      </div>
      <img src={logo} className="circle" />
      <strong>HelpYours !</strong>
      <div className="organization-form mt-5 d-flex flex-column justify-content-start p-3">
        <strong className="mb-4" style={{ fontSize: "24px" }}>
          Edit Information
        </strong>
        <form onSubmit={submit}>
          <div className="d-flex flex-column mb-2">
            <label
              htmlFor="username"
              className=""
              style={{ fontSize: "19px" }}
            >
              Name :
            </label>
            <input
              type="text"
              className="border-b container"
              name="username"
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="d-flex flex-column mb-2">
            <label
              htmlFor="email"
              className=""
              style={{ fontSize: "19px" }}
            >
              Email :
            </label>
            <input
              type="text"
              className="border-b container"
              name="email"
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="d-flex flex-column mb-2">
            <label
              htmlFor="password"
              className=""
              style={{ fontSize: "19px" }}
            >
              Change Password :
            </label>
            <input
              type="text"
              className="border-b container"
              name="password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-flex flex-column mb-2">
            <label
              htmlFor="contact"
              className=""
              style={{ fontSize: "19px" }}
            >
              Contact :
            </label>
            <input
              type="text"
              name="contact"
              className="border-b container"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column mb-2">
            <label
              htmlFor="location"
              className=""
              style={{ fontSize: "19px" }}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              className="border-b container"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="container-fluid mt-3" style={{ backgroundColor: "teal", width: "100px", color: "white" }}>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditInfo
