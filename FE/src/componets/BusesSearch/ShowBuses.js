import React, { useContext, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import MainNavbar from "../MainNavbar"
import UserContext from '../../UserContext/UserContext'
import ShowSeats from "../ShowSeats/ShowSeats"
import * as busApi from '../../api/Bus'
import * as seatsApi from '../../api/Seats'

const ShowBuses = ({ history, showDetails, searchData, data, setData }) => {
    const reservedSeats = useSelector(state => state.seats.reservedSeats) || []
    // console.log("reservedSeats",reservedSeats)
    const dispatch = useDispatch()
    let { userDet } = useContext(UserContext)
    const [viewSeats, setViewSeats] = useState(false)
    let [index, setIndex] = useState(0)
    const [showTicket, setShowTicket] = useState(false)
    // console.log("ticket", showTicket)
    // console.log(searchData);   
    const handleLogClick=()=>{
        // console.log("hello")
        setData(!data)
    }
    const renderAlertMsg=()=>{
        return(
            // <div className="sign_up_container ">
        <div className="login-form">
          <div className="form-box solid">
            <span onClick={handleLogClick}>Create New Account / Sign In</span>
          </div>
        {/* </div> */}
        </div>
        )
    }
    const handleViewSeats = (idx) => {
        // console.log(userDet)
        // if (!userDet.isLoggedIn && !userDet.isSignedIn) {
        //     console.log("hello")
        //     {renderAlertMsg()}
        // }
        setIndex(index = idx)
        setViewSeats(!viewSeats)
        // console.log(viewSeats,idx)
        if(userDet.isLoggedIn || userDet.isSignedIn) {
           
            // // console.log(viewSeats,idx)
            // console.log("hello",searchData.BusData.data.data[idx])
            seatsApi.showReseve(searchData.BusData.data.data[idx])
                .then(response => response.data)
                .then(data => {
                    let reservedSeats = data.result.reservation.seats
                    console.log("in show buses",reservedSeats)
                    // console.log("here in seatlayout",reservedSeats)
                    dispatch({ type: 'LOAD_RESERVED_SEATS', reservedSeats })
                })
            return index
        }

    }
    const renderViewSeats = () => {
        // console.log(index)

        return (
            <div className={`${!viewSeats ? "overlay" : ""} show`}>
                <div id="popdiv">
                    <ShowSeats history={history} viewSeats={viewSeats} index={index} searchData={searchData} showTicket={showTicket} setShowTicket={setShowTicket} />
                </div>
            </div>
        )
    }
    const performRender = () => {
        // console.log(searchData)
        if (searchData.didRender) {
            if (searchData.BusData.data.data != 0) {
                let TotalBuses = searchData.BusData.data.data.length;
                return (
                    <>
                        <div className={showTicket ? 'display-none' : "bus-result-container"}>
                            <ul>
                                <li>{searchData.BusData.data.data.map((bus, idx) => {
                                    let arrival = parseInt(parseInt(bus.dep) - parseInt(bus.arr) - 12)
                                    //    console.log(arrival)
                                    return (
                                        <>
                                            <ul key={idx} className="bus-result">
                                                <div className="bus-name-area">
                                                    <li>{idx}</li>
                                                    <li>{bus.busNumber}</li>
                                                    <li>{bus.busType}</li>
                                                </div>
                                                <div className="bus-Info">
                                                    <li>{bus.dep}</li>
                                                    <li>{arrival}</li>
                                                    <li>{bus.arr}</li>
                                                    <li>{bus.fare}</li>
                                                    <li>{bus.totalSeats - bus.reservation.seats.length}</li>
                                                </div>
                                                <li id="view-seats" ><button onClick={(e) => handleViewSeats(idx)}>View Seats{idx}</button></li>
                                            </ul>
                                        </>
                                    )

                                })}

                                </li>
                            </ul>
                            <span>{TotalBuses}</span>

                        </div>

                    </>
                )
            }
            else {
                return (
                    <div className="">
                        <h2>
                            No bus Available
                        </h2>
                    </div>)
            }
        }
    }
    const renderSourceDestination = () => {
        return (
            <>
                <span>{searchData.from}</span>
                <span>{searchData.to}</span>
            </>
        )
    }
    // const renderSeats=()=>{
    //     return(
    //         <ShowSeats/>
    //     )
    // }
    return (
        <>

            <MainNavbar history={history} data={data} setData={setData} />
            <div className={showTicket ? 'display-none' : ""}>
                <div className="display_source_destinaton">
                    {renderSourceDestination()}
                </div>
                {showDetails && <div className="BusDetails">
                    {/* <h2 id="busSelect">Select Bus</h2> */}
                    <div className="busInfo">
                        <ul>
                            <li>Departure</li>
                            <li>Duration</li>
                            <li>Arrival</li>
                            <li>Fare</li>
                            <li>Seat Available</li>
                            {/* <li><button>View Seats</button></li> */}
                        </ul>
                    </div>
                </div>}
            </div>

            {performRender()}
            {(viewSeats && (userDet.isLoggedIn || userDet.isSignedIn)) && renderViewSeats()}
            {(viewSeats && !userDet.isLoggedIn && !userDet.isSignedIn) && renderAlertMsg()}
            {/* {viewSeats && renderSeats()} */}


        </>
    )
}
export default ShowBuses