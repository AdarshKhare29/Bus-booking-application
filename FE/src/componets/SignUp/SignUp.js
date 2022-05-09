import React, { useState, useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import * as userApi from "../../api/user"
const SignUp = ({ history, data, setData }) => {
    console.log(history.location.pathname)
    let { dispatch } = useContext(UserContext)
    let [user, setUser] = useState({})
    const handleChangeEvent = (e, field) => {

        let fieldValue = e.target.value
        setUser({ ...user, [field]: fieldValue })
        if (e.target.value === "") {
            console.log("null")
        }
        console.log(user)
    }
    const handleSubmitEvent = e => {

        e.preventDefault()
        const userDet = {
            isSignedIn: true,
            isLoggedIn: true
        }
        userApi.doSave(user)
            .then(response => response.data)
            .then(user => {
                history.push(history.location.pathname)
                 // history.push('/Login')
            })
        dispatch({ type: "SIGNUP", userDet })
    }
    const handleCloseBtn = () => {
        console.log(data)
        setData(!data)
    }
    return (
        <div className="sign_up_container ">
            <div className="login-form">
                <div className="form-box solid">
                    <button className="btn-close" onClick={handleCloseBtn}></button>
                    <form onSubmit={e => handleSubmitEvent(e)}>
                        <h1 className="login-text">Sign In</h1>
                        <label>Name</label>
                        <br></br>
                        <input type="text" name="name" className="login-box" onChange={e => handleChangeEvent(e, 'name')} />
                        <label>Username</label>
                        <br></br>
                        <input type="text" name="username" className="login-box" onChange={e => handleChangeEvent(e, 'email')} />
                        <br></br>
                        <label>Password</label>
                        <br></br>
                        <input type="password" name="password" className="login-box" onChange={e => handleChangeEvent(e, 'password')} />
                        <br></br>
                        <label>Mobile No:</label>
                        <br></br>
                        <input type="text" name="mobile no" className="login-box" onChange={e => handleChangeEvent(e, 'mobile')} />
                        <div className="form-groupG">
                            <label htmlFor="gender" id="gen">Gender</label> <br />
                            <div className="gg">
                                <input id="male" name="gender" type="radio" onChange={e => handleChangeEvent(e, 'gender')} />
                                <label htmlFor="male" id="Male">Male</label>
                            </div>
                            <div className="gg">
                                <input id="female" name="gender" type="radio" onChange={e => handleChangeEvent(e, 'gender')} />
                                <label htmlFor="female"> Female</label>
                            </div>

                        </div>
                        <input type="submit" value="SignIn" className="login-btn" /><br />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default SignUp