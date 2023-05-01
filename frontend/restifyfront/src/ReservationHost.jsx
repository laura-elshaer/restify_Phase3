import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ReservationHost.css'; // import your CSS file here

function ReservationHost() {
    const [reservations, setReservations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [next, setNextPage] = useState(null);
    const [prev, setPrevPage] = useState(null);
    const [currentStatus, setCurrentStatus] = useState('All');
    const { status } = useParams();




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
        const acceptUrl = `http://localhost:8000/property/reservations/host/search/?status=ACCEPTED`;
  const rejectUrl = `http://localhost:8000/property/reservations/host/search/rejected`;
  const pendingUrl = `http://localhost:8000/property/reservations/host/search/?status=PENDING`;
  const searchAllUrl = `http://localhost:8000/property/reservations/host/search/`;
  const CancelpendingUrl = `http://localhost:8000/property/reservations/host/search/?status=CANCEL+PENDING`;
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

    const handleStatusChange = (status) => {
        setCurrentStatus(status);
      };
    const handlePrevPage = () => {

        fetchData(prev);
    };
    const handleApproveReservation = async (reservationId, statusHost) => {
        try {
            let status = '';
            console.log(statusHost);
            if (statusHost === 1) {
                status = 1;
            } else if (statusHost === 2) {
                status = 2;
            } else {
                throw new Error('Invalid statusHost value.');
            }
            console.log(status);
            const response = await fetch(`http://localhost:8000/property/reservations/decision/${reservationId}/${status}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });

            // if (response.status === 200 && (window.confirm("Are you sure you want to approve this cancellation request? Press OK to confirm approval or Press Cancel."))) {
            //     // If the API call is successful, update the status of the reservation in state
            //     setReservations((prevReservations) =>
            //         prevReservations.map((reservation) =>
            //             reservation.id === reservationId ? { ...reservation, status: status === 1 ? 'ACCEPTED' : 'REJECTED' } : reservation
            //         )
            //     );
            // } else {
            //     throw new Error('Failed to update reservation status');
            // }
            //

            if (response.status === 200) {
                // If the API call is successful and user pressed OK in the confirmation dialog box,
                // update the status of the reservation in state
                // setReservations((prevReservations) =>
                //     prevReservations.map((reservation) =>
                //         reservation.id === reservationId ? { ...reservation, status: status === 1 &&  window.confirm("Are you sure you want to approve this cancellation request? Press OK to confirm approval or Press Cancel.") ? 'ACCEPTED' : 'REJECTED' } : reservation
                //     )
                const confirmed = window.confirm("Press OK to confirm or Press Cancel.");
                if (confirmed) {
                    // If the user clicked "OK", update the status of the reservation in state
                    setReservations((prevReservations) =>
                        prevReservations.map((reservation) =>
                            reservation.id === reservationId ? { ...reservation, status: status === 1 ? 'ACCEPTED' : 'REJECTED' } : reservation
                        )
                    );
                }


            } else {
                throw new Error('Failed to update reservation status');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleCancelReservation = async (reservationId, statusHost) => {
        try {
            let status = '';
            console.log(statusHost);
            if (statusHost === 1) {
                status = 1;
            } else if (statusHost === 2) {
                status = 2;
            } else {
                throw new Error('Invalid statusHost value.');
            }
            console.log(status);
            const response = await fetch(`http://localhost:8000/property/reservations/cancel/pending/${reservationId}/${status}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });

            if (response.status === 200) {
                // If the API call is successful, update the status of the reservation in state
                const confirmed = window.confirm("Press OK to confirm or Press Cancel.");
                if (confirmed) {
                setReservations((prevReservations) =>
                    prevReservations.map((reservation) =>
                        reservation.id === reservationId ? { ...reservation, status: status === 1 ? 'CANCEL APPROVED' : 'CANCEL REJECTED' } : reservation
                    )
                );
                }
            } else {
                throw new Error('Failed to update reservation status');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteReservation = async (reservationId, check_in, check_out, num_days, numGuests) => {
        try {
            const response = await fetch(`http://localhost:8000/property/reservations/delete/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    check_in: check_in,
                    check_out: check_out,
                    num_days: num_days,
                    numGuests: numGuests
                }),
            });


            if (response.status === 200) {
               
                setReservations(prevReservations =>
                    prevReservations.filter(reservation => reservation.id !== reservationId)
                );
                

            }
        }
        catch (error) {
            console.error(error);
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bold'>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.num_days}</td>
                                <td>{reservation.numGuests}</td>
                                <td>{reservation.check_in}</td>
                                <td>{reservation.check_out}</td>
                                <td>{reservation.status}</td>

                                <td>
                                    {reservation.status === 'PENDING' && (
                                        <>
                                            <button className = 'approve bold' onClick={() => handleApproveReservation(reservation.id, 1)}>Approve</button>
                                            <button className = 'deny bold' onClick={() => handleApproveReservation(reservation.id, 2)}>Deny</button>
                                        </>
                                    )}
                                    {reservation.status === 'CANCEL PENDING' && (
                                        <>
                                            <button className = 'approve bold' onClick={() => handleCancelReservation(reservation.id, 1)}>Approve</button>
                                            <button className = 'deny bold' onClick={() => handleCancelReservation(reservation.id, 2)}>Deny</button>
                                        </>
                                    )}
                                    {reservation.status === 'ACCEPTED' && (
                                        <>
                                            <button className = 'terminate bold' onClick={() => handleApproveReservation(reservation.id, 2)}>Terminate</button>
                                        </>
                                    )}

                                    <button className = 'delete bold' onClick={() => handleDeleteReservation(reservation.id, reservation.check_in, reservation.check_out, reservation.num_days, reservation.numGuests)}>Delete</button>

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

export default ReservationHost;
