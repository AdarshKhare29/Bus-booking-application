import '../../stylesheets/home.css'
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../UserContext/UserContext';
// import Register from '../Register/Register'
import Banner from '../Banner/Banner';
import MainNavbar from '../MainNavbar'
import SignIn from '../SignIn/SignIn';
import { render } from 'react-dom';
const Home = (props) => {
    const {history, showDetails , setshowDetails ,searchData, setSearchData, data, setData}=props
    let {userDet, dispatch } = useContext(UserContext)
    const setDataValue = () => {
        console.log("hello");
    }
    const renderBanner=()=>{
        return(
            <Banner history={history}data={data} showDetails={showDetails} setshowDetails={setshowDetails} searchData={searchData} setSearchData={setSearchData}/>
        )
    }
    return (
        <>
            <MainNavbar history={history} data={data} setData={setData} setDataValue={setDataValue} />
            {renderBanner()}
        </>
    );
};

export default Home; 