import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as seatApi from '../../api/Seats'
import ShowTicket from '../TicketConfirmation/ShowTicket';
const ShowSeats = ({history, viewSeats ,searchData,index,showTicket,setShowTicket},props) => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const dispatch = useDispatch()
    const reservedSeats = useSelector(state => state.seats.reservedSeats) || []
    const selectedSeats = useSelector(state => state.seats.selectedSeats) || []
    console.log(props)
    console.log('reservedSeats', reservedSeats)
    console.log('reservedSeats', searchData)
    // const[showTicket,setShowTicket]=useState(false)
    const handleEvent = (e, seatNumber) => {
        if (!reservedSeats.includes(seatNumber))
            dispatch({ type: 'SELECT_SEATS', seatNumber })
    }
    const changeBgColor = (item) => {
        if (reservedSeats.includes(item))
            return 'red'
        if (selectedSeats.includes(item))
            return 'green'
        else
            return 'white'
    }
    // console.log(selectedSeats)
    // console.log(reservedSeats)
    // console.log("in view seats",searchData,index)
    const renderSeats = () => {
        return (arr).map(item=> {
            return (
                <li style={{ backgroundColor: changeBgColor(item) }}
                    onClick={e => handleEvent(e, item)}
                    className="spanEi" key={item}
                // className={reservedSeats.includes(item)?'bookedSeat':selectedSeats.includes(item)?'selectSeat':''}
                >
                    {item}
                </li>
            )
        })
    }
    const renderConfirmedTicket=()=>{
        console.log("hello")
        return(
            <ShowTicket searchData={searchData} selectedSeats={selectedSeats} credentials={credentials} index={index}/>
        )
    }
    const handleSubmitEvent = (e) => {
        console.log("in submit",searchData.BusData.data.data[index].busNumber,showTicket)
        seatApi.doReserve(selectedSeats,searchData.BusData.data.data[index].busNumber)
            .then(response => response.data)
            .then(data => {
                console.log(data)
            })
        setShowTicket(!showTicket)
    }
    const [credentials, setCredentials] = useState({
        names:[],
        ages:[]
    })
    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        if(field=='name'){
            // setCredentials({ ...credentials, [field]: fieldValue, })
        credentials.names.push(fieldValue)
        }
        else if(field=='age'){
            // setCredentials({ ...credentials, [field]: fieldValue, })
        credentials.ages.push(fieldValue)
        }
      }
    console.log(credentials)
    const renderPassangerDetails=()=>{
        return selectedSeats.map(item => {
            return (
                <li className="bookingDetails" key={item}>
                    {/* <span className="seatNo">{item}</span> */}
                    <div>
                        <div>
                            <input className="passDetails" placeholder="Name" onBlur={e => handleChangeEvent(e, 'name')} />
                        </div>
                        <div>
                            <input className="passDetails" placeholder="Age" onBlur={e => handleChangeEvent(e, 'age')} />
                        </div>
                    </div>
                </li>
            )
        })
    }
    const renderBookingDetails=()=>{
        let fare=(searchData.BusData.data.data[index].fare)*selectedSeats.length
        // console.log(fare)
        return(
            <div className="bookingDetails">
                <span>Seat No: {selectedSeats.join(",")}</span><br/>
                {renderPassangerDetails()}
                 <span>Amount: {fare}</span>
                 <button onClick={(e)=>handleSubmitEvent(e)}>Proceed to book</button>
            </div>
        )
    }
        return (
            <>
                <div className={showTicket ? 'display-none' : "travel-plan"}>
                    <div className="mainRender" >
                        {renderSeats()}
                    </div>
                    <div className='seat-details'>
                        {selectedSeats.length>0 && renderBookingDetails()}
                    </div>
                </div>
                {showTicket&& renderConfirmedTicket()}
            </>
        );
};

export default ShowSeats;