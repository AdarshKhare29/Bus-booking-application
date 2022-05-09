import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './stylesheets/style.css';
import Home from './componets/Home/Home'
import UserContext from './UserContext/UserContext'
import { useReducer } from 'react';
import userReducer from './reducer/userReducer'
import { createHashHistory } from 'history'
import ShowBuses from './componets/BusesSearch/ShowBuses';
import ShowTicket from './componets/TicketConfirmation/ShowTicket';
export const history = createHashHistory()
const initialState = {
  UserEmail: '',
  Password: '',
  isLoggedIn: false,
  isSignedIn: false
}
function App() {
  const[showDetails,setshowDetails]=useState(false)
  const [data, setData] = useState(false)

  // console.log(initialState);
  const [searchData, setSearchData] = useState({
    Source: '',
        Destination: '',
        TravelDate: '',
        loading: false,
        Error: '',
        BusData: {},
        didRender: false
  })
  let [userDet, dispatch] = useReducer(userReducer, initialState)
  // console.log("in app",searchData)
  return (
    <>
    <Router>
      <UserContext.Provider value={{ userDet, dispatch }}>



        <Switch>
          <div className="Wrapper">
            <Route exact path="/" render={props => <Home showDetails={showDetails} setshowDetails={setshowDetails} searchData={searchData} setSearchData={setSearchData} data={data} setData={setData}{...props} />}></Route>
           <Route path="/buses" render={props => <ShowBuses showDetails={showDetails} searchData={searchData} setSearchData={setSearchData} data={data} setData={setData}{...props} />}></Route>
            <Route path="/show-ticket" render={props =><ShowTicket searchData={searchData}  {...props}/>}></Route>
          </div>
        </Switch>


      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;
