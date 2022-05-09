import React, { useState } from "react"
import * as busApi from '../../api/Bus'

const Banner = ({history,data,showDetails,setshowDetails,searchData, setSearchData})=>{
    let ErrorInValidation=true
    const handleSubmitEvent = e => {
        e.preventDefault()
        setSearchData({ ...searchData, loading: true, Error: '', didRender: false })
        // console.log("before api call",searchData)
        busApi.doSearch(searchData)
            .then((data) => {
                if (data.message) {
                    console.log("first")
                    setSearchData({ ...searchData, Error: data.message, loading: false, BusData: [], didRender: false })
                }
                else {
                    // console.log('here in else', data)
                    setSearchData(searchData.BusData=data.data)
                    setSearchData({ ...searchData, didRender: true, loading: false, Error: '', BusData: data, })
                    // console.log("searchData", searchData)
                }
            })
            .catch((err) => {
                setSearchData({ ...searchData, Error: "Failed to load data", loading: false, BusData: [], didRender: false })
            })
            history.push("/buses")
    }

    const handleChangeEvent = (e, field) => {
        const fieldValue = e.target.value
        setSearchData({ ...searchData, [field]: fieldValue })
        console.log(searchData)
    }
    
    const validateField=()=>{
        if(searchData.from && searchData.to){
            ErrorInValidation=false
        }
    }
    const renderSeachButton = () => {
        validateField()
        if (ErrorInValidation) {
            return (
                <button id="disabled" disabled={ErrorInValidation} className="fl button">Search Buses</button>
            )
        }
        else{
            return(
            <button id="search_btn" disabled={ErrorInValidation} className="fl button" onClick={() => setshowDetails(showDetails = true)}>Search Buses</button>
            )
        }
    }
    return(
        <>       
         <div className='banner' id={data ? 'low-opacity' : "clearfix"}>
                <div className='image-div'>
                    <div id='welcome_image_div' style={{ backgroundImage: "url('/images/redbus.png')" }}></div>
                </div>
                <h1 className="image-text main-header-family"></h1>
                <div id='search-div' className={data ? 'low-opacity' : "clearfix"}>
                    <form id="search" onSubmit={e => handleSubmitEvent(e)}>
                        <div className="clearfix search-wrap">
                            <div className="f1 search-box clearfix" style={{ borderColor: "rgb(210, 210, 210)" }}>
                                <span className="fl icon-city icon">
                                </span>
                                <div>
                                    <input type="text" id="src" className="db" data-message="Please enter a source city" tabIndex="1"  onChange={e => handleChangeEvent(e, 'from')}/>
                                    <label htmlFor="src" className="db move-up" style={{ left: "15%" }}>FROM</label>
                                </div>
                            </div>
                            <span className="icon-doublearrow icon" id="togglebtn"></span>
                            <div className="f1 search-box" style={{ borderColor: "rgb(210, 210, 210)" }}>
                                <span className="fl icon-city icon">
                                </span>
                                <div>
                                    <input type="text" id="dest" className="db" data-message="Please enter a destination city" tabIndex="2"  onChange={e => handleChangeEvent(e, 'to')}/>
                                    <label htmlFor="dest" style={{ left: "21%" }} className="db move-up">TO</label>
                                </div>
                            </div>
                            <div className="fl search-box date-box gtm-onwardCalendar">
                                <span className="fl icon-calendar_icon-new icon-onward-calendar icon">
                                </span>
                                <div>
                                    <input type="text" id="onward_cal" className="db" tabIndex="3" data-caleng="26-Apr-2022" />
                                    <label htmlFor="onward_cal" className="db text-trans-uc move-up">Date</label>
                                </div>
                            </div>
                            {renderSeachButton()}
                        </div>
                    </form>
                </div>
            </div>
            {/* <div>
                    {showDetails && <div className="BusDetails">
                        <h2 id="busSelect">Select Bus</h2>
                        <div className="busInfo">
                            <ul>
                                <li>Bus Number</li>
                                <li>Bus Type</li>
                                <li>Departure</li>
                                <li>Arrival</li>
                                <li>Available</li>
                                <li>Fare</li> */}
                                {/* <li><button onClick={handleViewSeats}>View Seats</button></li> */}

                            {/* </ul>
                        </div>
                    </div>}
                </div>
                {performRender()} */}
            
            </>
    )
}
export default Banner