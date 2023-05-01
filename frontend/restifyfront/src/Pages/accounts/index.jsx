
// import {  Outlet,Link  } from 'react-router-dom';
// import './index.css'

// const Accounts = () => {
//    return <>
//    <header>
//     <Link to="/">Login </Link>
//     <Link to="/Register">Register </Link>
//     <Link to="/update">Update </Link>
//     <Link to="/reservationForm">ReservationForm </Link>
//     <Link to="/userList">UserList </Link>
//     <Link to="/listOfReservations/:status?">HostList </Link>
//     <Link to="/notif">Notifications </Link>
//     <Link to="/propertyForm">AddProperty </Link>
//     <Link to="/Properties">Properties </Link>
    
    
//    </header>
   
//    <Outlet/>
//    <footer>
//    <div class="container">
//       <div class="row mb-4">
//         <div class="col-md-3 mb-5">
//           <ul class="list-unstyled link">
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Terms &amp; Conditions</a></li>
//             <li><a href="#">Privacy Policy</a></li>
            
//           </ul>
//         </div>
        

       
//       </div>
     
//     </div>
//    </footer>
//    </>
// }

// export default Accounts;
import { Outlet, Link } from 'react-router-dom';
import './index.css';

const Accounts = () => {
  return (
    <>
      <header className="header">
        <div className="logo">RESTIFY</div>
        <nav className="nav">
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/update">Update</Link>
          <Link to="/reservationForm">ReservationForm</Link>
          <Link to="/userList">UserList</Link>
          <Link to="/listOfReservations/:status?">HostList</Link>
          <Link to="/notif">Notifications</Link>
          <Link to="/propertyForm">AddProperty</Link>
          <Link to="/properties">Properties</Link>
        </nav>
      </header>
      <Outlet />
      
    </>
  );
};

export default Accounts;
