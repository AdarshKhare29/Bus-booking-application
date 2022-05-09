
import axios from 'axios'

export function doReserve(seats,busNumber) {
    let apiUrl = 'http://localhost:8080/seats/reserve-seat'
    return axios.post(apiUrl, {busNumber, seats},{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export function showReseve({busNumber}){
    let apiUrl = `http://localhost:8080/seats/reserve?q=${busNumber}`
    return axios.get(apiUrl)
}