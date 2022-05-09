import React from "react";
const ShowTicket = ({searchData,selectedSeats,credentials,index}) => {
    // console.log(searchData,searchData.BusData.data.data[index].fare)
    let fare=(searchData.BusData.data.data[index].fare)*selectedSeats.length
    const renderTicketName=()=>{
        return credentials.names.map(item=>{
            return(
                <li>Names:{item}</li>
            )
        })
    }
    const renderAge=()=>{
        return credentials.ages.map(item=>{
            return(
                <li>Age:{item}</li>
            )
        })
    }
    return (
        <>
            <h1>Your Ticket is successfully booked</h1>
            <div className="ticket-container">
                <span>From : {searchData.from}</span><br/>
                <span>To : {searchData.to}</span><br/>
                {renderTicketName()}
                {renderAge()}
                <span>Seats No:  {selectedSeats.join(",")}</span><br/>
                <span>Total Amount Paid: {fare}</span>
            </div>
        </>
    )
}
export default ShowTicket