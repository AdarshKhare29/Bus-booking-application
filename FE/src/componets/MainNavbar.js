import React, { useState } from 'react';
import { useContext } from 'react';
// import * as userApi from '../api/user'

// import UserContext from '../UserContext/UserContext'
import SignIn from './SignIn/SignIn';
import UserContext from '../UserContext/UserContext';

const MainNavbar = (props) => {
    const {history,data,setData}=props
    let {userDet, dispatch } = useContext(UserContext)
    // console.log("in navbar",props)
    // console.log(history.location.pathname)
    // const [errorMsg, setErrorMsg] = useState()
    // let { dispatch } = useContext(UserContext)

    // let [credentials, setCredentials] = useState({})
    // const handleChangeEvent = (e, field) => {
    //     let fieldValue = e.target.value
    //     setCredentials({ ...credentials, [field]: fieldValue })
    // }
    // const handleSubmitEvent = e => {
    //     e.preventDefault()
    //     const userDet = {
    //         isLoggedIn: true
    //     }
    //     userApi.doLogin(credentials)
    //         .then(response => response.data)
    //         .then(data => {
    //             let { token } = data
    //             sessionStorage.setItem('authToken', token)
    //             console.log('data', data)
    //             // history.push("/BusBooking")

    //             history.push("/Travel-plan")
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //             setErrorMsg('User Email or Password is incorrect')
    //         })
    //     dispatch({ type: "LOGIN", userDet })
    // }
    // useEffect(() => {

    // }, [errorMsg])

    // const renderError = () => {
    //     if (errorMsg) {
    //         return <div className="errorMsg">{errorMsg}</div>
    //     }
    // }
    const [hide,setHide]=useState(false)
    const renderSignUP = () =>{
        setHide(!hide)
        console.log("open",props.data)
        setData(!data)
        
    }
    // console.log(userDet)

    const handleLogOutBtn=()=>{
        const userDet={
            isSignedIn: false,
            isLoggedIn:false
        }
        dispatch({ type: "LOGOUT", userDet })
        console.log(userDet)
    }
    const renderLogSign=()=>{
        if(!userDet.isLoggedIn &&!userDet.isSignedIn){
        return <div className='sign_in_popUp' onClick={renderSignUP}>
            <div className="toparrowhead-sign" ></div>
            <p >Sign In/Sign Up</p>
        </div>}
        else{
            return <div className='sign_in_popUp' onClick={renderSignUP}>
            <div className="toparrowhead-sign" ></div>
            <button onClick={handleLogOutBtn}>Logout</button>
        </div>
        }
    }
    const hideNShow=()=>{
        console.log("click",hide)
        setHide(!hide);
    }
    const renderSignUPInfo=()=>{
        return(
            <ul>
                        <li><a href="#home">Help</a></li>
                        <li>
                            <div onClick={hideNShow}>
                                <span className="icon-user_icon-new  icon"> </span>
                                <span className="icon-down_icon-new  icon"> </span>
                            </div>
                        </li>
                    </ul>
        )
    }
    const renderSignUp=()=>{
        return(
            <div className={`${!data ? "overlay" : ""} show`}>
                <div id="popdiv">
                    {data && <SignIn  history={history} data={data} setData={setData}/>}

                </div>
            </div>
        )
    }
    return (
        <>
            {!userDet.isLoggedIn&&renderSignUp()}

            <nav className="navbar" >
                <div className='navbar-left'>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#news">Contact</a></li>
                        <li><a href="#contact">About</a></li>
                    </ul>
                </div>
                <div className='navbar-right'>
                    {renderSignUPInfo()}
                </div>
                {hide && renderLogSign()}
                {/* {props.data && <SignUP/>} */}
                {/* {show && _renderSignUpContainer()} */}
                {/* <form className="logIn-form" onSubmit={e => handleSubmitEvent(e)}>
                {renderError()}
                <label htmlFor="email">Email :</label>
                <input type="text" id="email" placeholder="Enter Email" onChange={e => handleChangeEvent(e, 'email')} required />
                <label htmlFor="password">Password :</label>
                <input type="password" id="password" placeholder="Enter Password" onChange={e => handleChangeEvent(e, 'password')} required />
                <button className="logIn-btn">Log in</button>
            </form> */}
            </nav>
        </>
    )
}

export default MainNavbar;