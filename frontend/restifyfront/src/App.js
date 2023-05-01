import logo from './logo.svg';
import './App.css';
import ReservationForm from './ReservationForm';
import ReservationHost from './ReservationHost';
import PropertyForm from './PropertyForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login';
import NotificationList from './NotificationList';
import Register from './Register';
import ReservationUserList from './ReservationUserList';
import Properies from './PropertyList';
import CommentsForm from './comments'
import Update from './Update'
import Accounts from './Pages/accounts';


function App() {
  return (
    // <!--<div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element ={<Accounts/>}>
            <Route index element = {<Login/>}/>
            <Route path="/Register" element={<Register />}>
          </Route>
          <Route path="/update" element={<Update />}>
          </Route>
          <Route path="/listOfReservations/:status?" element={<ReservationHost />} />
          <Route path="/userList" element={<ReservationUserList />}>
          </Route>
          <Route path="/reservationForm" element={<ReservationForm />}>
          </Route>


          <Route path="/notif" element={<NotificationList />}>
          </Route>
          

          <Route path="/Properties" element={<Properies />}>
          </Route>
          
          {/* <Route path="/comments" element={<CommentsForm />}>
          </Route> */}
          <Route path="/propertyForm" element={<PropertyForm />}>
          </Route>
          </Route>

          {/* <Route path="/reservationForm" element ={<Reservation/>}>
            <Route index element = {<ReservationForm/>}/>
           
          <Route path="/listOfReservations/:status?" element={<ReservationHost />} />
          <Route path="/userList" element={<ReservationUserList />}>
          </Route>
          </Route> */}

          
          
          {/* <Route path="/login" element={<Login/>}>
          </Route> */}
          
          
        </Routes>
      
    </BrowserRouter>
   // </div>
  );
  
}

export default App;
