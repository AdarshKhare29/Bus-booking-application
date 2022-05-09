import React from "react"
import { useState, useEffect, useContext } from 'react';
import * as userApi from "../../api/user"
import SignUp from "../SignUp/SignUp";

// import UserContext from '../UserContext/UserContext'
import UserContext from '../../UserContext/UserContext'
const SignIn = ({ history, data, setData }) => {
  // console.log("in signu",history)
  const [showSignUp, setShowSignUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  let { userDet, dispatch } = useContext(UserContext)
  console.log(history.location.pathname, userDet)

  let [credentials, setCredentials] = useState({})
  const handleChangeEvent = (e, field) => {
    let fieldValue = e.target.value
    setCredentials({ ...credentials, [field]: fieldValue })
  }
  const handleSubmitEvent = e => {
    e.preventDefault()
    userDet = {
      isLoggedIn: true
    }
    // console.log(userDet)
    userApi.doLogin(credentials)
      .then(response => response.data)
      .then(data => {
        let { token } = data
        sessionStorage.setItem('authToken', token)
        // console.log('data', data)
        // history.push("/BusBooking")

        history.push(history.location.pathname)
      })
      .catch((e) => {
        console.log(e)
        setErrorMsg('User Email or Password is incorrect')
      })
    dispatch({ type: "LOGIN", userDet })
  }
  useEffect(() => {

  }, [errorMsg])

  const renderError = () => {
    if (errorMsg) {
      return <div className="errorMsg">{errorMsg}</div>
    }
  }
  const handleCloseBtn = () => {
    console.log(data)
    setData(!data)
  }
  const handleSignUpBtn = () => {
    setShowSignUp(!showSignUp)
    console.log(showSignUp)
  }
  const renderSignIN = () => {
    return (
      <div className="sign_up_container ">
        <div className="login-form">
          <div className="form-box solid">
            <button className="btn-close" onClick={handleCloseBtn}></button>
            <form onSubmit={e => handleSubmitEvent(e)}>
              <h1 className="login-text">Sign In</h1>
              <label>Username</label>
              <br></br>
              <input type="text" name="username" className="login-box" onChange={e => handleChangeEvent(e, 'email')} />
              <br></br>
              <label>Password</label>
              <br></br>
              <input type="password" name="password" className="login-box" onChange={e => handleChangeEvent(e, 'password')} />
              <br></br>
              <input type="submit" value="LOGIN" className="login-btn" /><br />

            </form>
            <span>Create New Account <button onClick={handleSignUpBtn}>Sign Up</button></span>
          </div>
        </div>
        {renderError()}
      </div>
    )
  }
  const renderSignUP = () => {
    return (
      <SignUp history={history} data={data} setData={setData}/>
    )
  }
  if (!showSignUp) {
    return (
      <>
        {renderSignIN()}
      </>
    )
  }
  else {
    return <>
      {!userDet.isSignedIn&& renderSignUP()}
    </>
  }
}
export default SignIn