import React, { useState, useEffect } from 'react';

import './ReservationHost.css'; // import your CSS file here

function ReservationUserList() {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCanceling, setIsCanceling] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('All');
    const [next, setNextPage] = useState(null);
    const [prev, setPrevPage] = useState(null);
    const fetchData = async (page) => {
      //let url = `http://localhost:8000/property/reservations/host/search/?page=${page}`;

      // let url = `http://localhost:8000/property/reservations/host/search/?page=${page}`;
      // if (status) {
      //     url += `&status=${status}`;
      //   }
      const response = await fetch(page, {
          headers: { 'Authorization': "Bearer " + localStorage.getItem("token") }
      });

      const data = await response.json();
      // console.log(data);
      setReservations(data.results);
      setPrevPage(data.previous);
      setNextPage(data.next);
  };
  useEffect(() => {
      const acceptUrl = `http://localhost:8000/property/reservations/customer/search/?status=ACCEPTED`;
const rejectUrl = `http://localhost:8000/property/reservations/customer/search/rejected`;
const pendingUrl = `http://localhost:8000/property/reservations/customer/search/?status=PENDING`;
const searchAllUrl = `http://localhost:8000/property/reservations/customer/search/`;
const CancelpendingUrl = `http://localhost:8000/property/reservations/customer/search/?status=CANCEL+PENDING`;
      // let url = `http://localhost:8000/property/reservations/host/search/`;
      let url = searchAllUrl;
    if (currentStatus === 'Pending') {
      url = pendingUrl;
    } else if (currentStatus === 'Accepted') {
      url = acceptUrl;
    } else if (currentStatus === 'Rejected') {
      url = rejectUrl;
    }
    else if (currentStatus === 'Cancel Pending') {
      url = CancelpendingUrl;
    }
      fetchData(url);
  }, [currentStatus]);
  const handleNextPage = () => {
      fetchData(next);

  };

  // const acceptUrl = `http://localhost:8000/property/reservations/customer/search/?status=ACCEPTED`;
  // const rejectUrl = `http://localhost:8000/property/reservations/customer/search/rejected`;
  // const pendingUrl = `http://localhost:8000/property/reservations/customer/search/?status=PENDING`;
  // const searchAllUrl = `http://localhost:8000/property/reservations/customer/search/`;
  // const CancelpendingUrl = `http://localhost:8000/property/reservations/customer/search/?status=CANCEL+PENDING`;
  // //?status=cancel+pending

  //   useEffect(() => {
  //     const fetchData = async (page) => {
  //     let url = searchAllUrl;
  //     if (currentStatus === 'Pending') {
  //       url = pendingUrl;
  //     } else if (currentStatus === 'Accepted') {
  //       url = acceptUrl;
  //     } else if (currentStatus === 'Rejected') {
  //       url = rejectUrl;
  //     }
  //     else if (currentStatus === 'Cancel Pending') {
  //       url = CancelpendingUrl;
  //     }
  //     const response = await fetch(url, {
  //       headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
  //     });
  //       // const fetchData = async (page) => {
  //       //     const response = await fetch(`http://localhost:8000/property/reservations/customer/search/`, {
  //       //         headers: { 'Authorization': "Bearer " + localStorage.getItem("token") }
  //       //     });
  //       const data = await response.json();
  //       setReservations(data.results);
  //     };
  //     fetchData(currentPage);
  //   }, [currentPage, currentStatus]);
    //         const data = await response.json();
    //         // console.log(data);
    //         setReservations(data.results);
    //     };

    //     fetchData(currentPage);
    // }, [currentPage]);
    // const handleNextPage = () => {
    //     const nextPage = currentPage + 1;
    //     // console.log(nextPage);
    //     // console.log(reservations.length);
    //     const numPages = Math.ceil(reservations.length / 5) + 1;
    //     //console.log(numPages);
    //     if (nextPage > numPages) {
    //         console.error('No more reservations');
    //         return;
    //     }

    //     setCurrentPage(nextPage);
    // };

    // const handlePrevPage = () => {
    //     setCurrentPage(currentPage - 1);
    // };
     const handlePrevPage = () => {

        fetchData(prev);
    };
    const handleStatusChange = (status) => {
      setCurrentStatus(status);
    };

    const handleCancel = async (reservation) => {
        setIsCanceling(true);
        try{
        const response = await fetch(`http://localhost:8000/property/reservations/cancel/${reservation.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
          });
          const data = await response.json();
          console.log(data);
          console.log(response);
          setIsCanceling(false);
      
          if (response.ok) {
            // success, show notification to user
            console.log("WHY ARENT U WORKING");
          alert('Reservation cancellation request submitted');
          }
      
        }  
        catch (error) {
          console.log(error);
          setIsCanceling(false);
          // Handle error
          alert('Failed to cancel reservation. Please try again later');
        }
         
      };

    


    return (
        <div className='mypage'>
    <div className="ReservationHost">
      <h1>Reservation Dashboard</h1>
      <div className='left' >
          <button onClick={() => handleStatusChange('All')} className={`next-prev ${currentStatus === 'All' ? 'active' : ''}`}>
            All
          </button>
          <button 
            onClick={() => handleStatusChange('Pending')}
            className={`next-prev ${currentStatus === 'Pending' ? 'active' : ''}`}
          >
            Pending
          </button>
          <button 
            onClick={() => handleStatusChange('Cancel Pending')}
            className={`next-prev ${currentStatus === 'Cancel Pending' ? 'active' : ''}`}
          >
           Cancel Pending
          </button>
          <button
            onClick={() => handleStatusChange('Accepted')}
            className={`next-prev ${currentStatus === 'Accepted' ? 'active' : ''}`}
          >
            Accepted
          </button>
          <button
            onClick={() => handleStatusChange('Rejected')}
            className={`next-prev ${currentStatus === 'Rejected' ? 'active' : ''}`}
          >
            Rejected
          </button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Num of Days</th>
            <th>Num of Guests</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            
            {/* <th>Customer ID</th>
            <th>Owner ID</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.num_days}</td>
              <td>{reservation.numGuests}</td>
              <td>{reservation.check_in}</td>
              <td>{reservation.check_out}</td>
              <td>{reservation.status}</td>
              
              <td>
                <button className = 'deny'onClick={() => handleCancel(reservation)}>Cancel Reservation</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
        
       
     <table className='t'>
                <tr className='r'>
                    <td className="border_td">
                        {next !== null
                            ? <button className="next-prev" onClick={handleNextPage}>Next</button>
                            : <></>}
                        {prev !== null
                            ? <button className="next-prev" onClick={handlePrevPage}>Prev</button>
                            : <></>}
                        {/* 
      <button className="next-prev" onClick={handlePrevPage} disabled={ === 1}>Prev</button>
      <button className="next-prev" onClick={handleNextPage}>Next</button> onClick={handleNextPage} */}

                    </td>
                </tr>
            </table>
</div>

    );
}

export default ReservationUserList;
