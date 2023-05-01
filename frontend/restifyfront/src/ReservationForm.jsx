

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzOTMzNDk2LCJpYXQiOjE2ODEzNDE0OTYsImp0aSI6IjdkZDUyNGRhNjVmYzRhMjk4ZDUwYzJiNDBjY2Y4NGFhIiwidXNlcl9pZCI6OSwidXNlcm5hbWUiOiJhbnVzaGthIn0.5XjYdVxZchctj39UZZBQoyO-XbUDOE_RIM5ltYf5Ypg
//https://pypi.org/project/django-cors-headers/
// ////////////////WORKSSSS!!/////////////////////
 import React, { useState , useEffect} from "react";
 import './ReservationForm.css';


// function ReservationForm() {
//   const [reservation, setReservation] = useState({
  
//     check_in: "",
//     check_out: "",
//     numGuests: 1,
//     num_days: 1,
//     property_id: "",

//   });
//   const [checked, setChecked] = useState(true);
//   const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [numDays, setNumDays] = useState('');
//     const [numGuests, setNumGuests] = useState('');
//     const [property_id, setproperty_id] = useState('');

//     const createReservation = async (propId) => {
//       const payload = {
//           check_in: checkIn,
//           check_out: checkOut,
//           num_days: numDays,
//           numGuests: numGuests,
//           property_id: property_id,
//       };

//       const response = await fetch(`http://localhost:8000/property/reservations/${propId}/`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
//           body: JSON.stringify(payload)
//       });
//       const data = await response.json();
//        console.log(data);
//       setReservation(data.results);
//       if (response.ok) {
//         alert("Reservation made Successfully");
//           // success, do something here
//       } else {
//         alert("error");
//           // error, handle it here
//       }
//   };

//   const handleChange = (event, val) => {
//     setReservation({
//       ...reservation,
//       [event.target.name]: event.target.value,
//     });
//     setChecked(val);
//   };
  
//   const calculateTotalPrice = (reservation) => {
//     const startDate = new Date(reservation.check_in);
//     console.log(reservation.property_id);
//     console.log("hello");
//     const endDate = new Date(reservation.check_out);
//     const numDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
//     let basePrice = 100;
 
//     const dayOfWeek = startDate.getDay();
//     if (dayOfWeek === 5 || dayOfWeek === 6) {
//       basePrice += 25;
//     }
    
  
//     const numGuests = reservation.numGuests;
//     const extraGuestPrice = 10;
//     const extraGuestCost = (numGuests - 1) * extraGuestPrice;
    
//     return basePrice * numDays + extraGuestCost;
//   };
  
  
//   const handleSubmit = (event, property_id) => {
//     event.preventDefault();
//     const totalPrice = calculateTotalPrice(reservation);
//     console.log({ ...reservation, totalPrice });
//   //   const response = fetch(`http://localhost:8000//property/reservations/${property_id}/`, {
//   //     method: 'POST',
//   //     headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': "Bearer " + localStorage.getItem("token"),
//   //     },
//   //     body: JSON.stringify({
//   //       check_in: reservation.checkin,
//   //       check_out: reservation.checkout,
//   //       num_days: Math.floor((reservation.checkout - reservation.checkin) / (1000 * 60 * 60 * 24)),
//   //       numGuests: reservation.adults + reservation.children
//   //     })
//   // });
//   // const data =  response.json();
//   //   console.log(data);
//   };
  

//   return (
//   <div className="reservation-container">
//     <div className="reservation-box">
//       <h1>Reservation</h1>
//   <form className="reservation-form" onSubmit={handleSubmit}>
//   <table>
//     <tbody>
//       <tr>
//             <th><label htmlFor="check-in">Check-in:</label></th>
//             <td><input type="date" id="check_in" name="check_in" value={reservation.check_in} onChange={handleChange} required /></td>
    
//       </tr>
//       <tr>
//         <th><label htmlFor="checkout">Check-out:</label></th>
//         <td><input type="date" id="check_out" name="check_out" value={reservation.check_out} onChange={handleChange} required /></td>
//       </tr>
//       <tr>
      

//         <th><label htmlFor="numGuests">Number of Guests:</label></th>
//         <td><input type="number" id="numGuests" name="numGuests" min="1" value={reservation.numGuests} onChange={handleChange} required /></td>
//       </tr>
//       <tr>
//       <th><label htmlFor="property_id">Property ID:</label></th>
//         <td><input type="number" id="property_id" name="property_id"  value={reservation.property_id} onChange={handleChange} required /></td>
//       </tr>
function ReservationForm() {
  const [reservation, setReservation] = useState({
    check_in: "",
    check_out: "",
    numGuests: 1,
    num_days: 1,
    property_id: "",
    
  });

  const [totalPrice, setTotalPrice] = useState(0);
  // const [isCanceling, setIsCanceling] = useState(false);
  const [isReserving, setIsReserving] = useState(false);

  const handleChange = (event) => {
    setReservation({
      ...reservation,
      [event.target.name]: event.target.value,
    });
  };

  const calculateTotalPrice = (reservation) => {
    const startDate = new Date(reservation.check_in);
    const endDate = new Date(reservation.check_out);
    const numDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    let basePrice = 100;

    const dayOfWeek = startDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      basePrice += 25;
    }

    const numGuests = reservation.numGuests;
    const extraGuestPrice = 10;
    const extraGuestCost = (numGuests - 1) * extraGuestPrice;

    return basePrice * numDays + extraGuestCost;
  };

  // const handleCancel = async (event) =>{

  // }


  // const handleCancel = async (reservation) => {
  //   setIsCanceling(true);
  //   try{
  //   const response = await fetch(`http://localhost:8000/property/reservations/cancel/${reservation.id}`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     console.log(response);
  //     setIsCanceling(false);
  
  //     if (response.ok) {
  //       // success, show notification to user
  //       console.log("WHY ARENT U WORKING");
  //     alert('Reservation cancellation request submitted');
  //     }
  
  //   }  
  //   catch (error) {
  //     console.log(error);
  //     setIsCanceling(false);
  //     // Handle error
  //     alert('Failed to cancel reservation. Please try again later');
  //   }
     
  // };


  
  const handleSubmit = (event, property_id, id) => {
        event.preventDefault();
        const totalPrice = calculateTotalPrice(reservation);
        console.log("Hello");
        console.log(totalPrice);
        console.log({ ...reservation, totalPrice });
  }

  const handleReserve = async(reservation) => {
    //setIsReserving(true);
  
    
      const payload = {
        check_in: reservation.check_in,
        check_out: reservation.check_out,
        num_days: reservation.num_days,
        numGuests: reservation.numGuests,
        property_id: reservation.property_id,
      };
  
      const response = await fetch(`http://localhost:8000/property/reservations/${reservation.property_id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
     // setIsReserving(false);

      if (response.ok) {
        alert("Reservation made successfully!");
        setTotalPrice(totalPrice);
        setReservation({
          check_in: "",
          check_out: "",
          numGuests: 1,
          num_days: 1,
          property_id: "",
        });
      } else {
       // setIsReserving(false);
        alert("Error making reservation.");
      }
     
  
};

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

    

  //   const payload = {
  //     check_in: reservation.check_in,
  //     check_out: reservation.check_out,
  //     num_days: reservation.num_days,
  //     numGuests: reservation.numGuests,
  //     property_id: reservation.property_id,
  //   };

  //   const response = await fetch(`http://localhost:8000/property/reservations/${reservation.property_id}/`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
  //     body: JSON.stringify(payload),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     alert("Reservation made successfully!");
  //     setTotalPrice(totalPrice);
  //     setReservation({
  //       check_in: "",
  //       check_out: "",
  //       numGuests: 1,
  //       num_days: 1,
  //       property_id: "",
  //     });
  //   } else {
  //     alert("Error making reservation.");
  //   }
  // };

  return (
    <div className="reservation-container new">
      <div className="reservation-box ">
        <h1>Reservation</h1>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label htmlFor="check_in">Check-in:</label></th>
                <td><input type="date" id="check_in" name="check_in" value={reservation.check_in} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="check_out">Check-out:</label></th>
                <td><input type="date" id="check_out" name="check_out" value={reservation.check_out} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="numGuests">Number of Guests:</label></th>
                <td><input type="number" id="numGuests" name="numGuests" min="1" value={reservation.numGuests} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <th><label htmlFor="property_id">Property ID:</label></th>
                <td><input type="number" id="property_id" name="property_id" value={reservation.property_id} onChange={handleChange} required /></td>
              </tr>

      <tr>
        <th><label htmlFor="num_days">Number of Days:</label></th>
        <td><input type="number" id="num_days" name="num_days" min="1"  value={reservation.num_days} onChange={handleChange} required /></td>
      </tr>
      
    </tbody>
  </table>
  <tr>
        <td colSpan="2"><button className = 'create'onClick={() => handleReserve(reservation)}>Create Reservation</button></td>
        {/* <td colSpan="2"><button onClick={() => handleCancel(reservation)} >Cancel Reservation</button></td> */}
      </tr>
</form>
</div>
</div>


   );
}

export default ReservationForm;
/////////////////////////////////////////////////////////////////////////////////////////

//Just based on the days and not the guests if we want to adjust price based on that:
// function calculateTotalPrice(reservation) {
  //   const { checkin, checkout } = reservation;
  //   const days = Math.floor((Date.parse(checkout) - Date.parse(checkin)) / (1000 * 60 * 60 * 24));
  //   const checkinDay = new Date(checkin).getDay();
  //   let pricePerNight = 100; // default price per night
  
  //   // Check if the reservation includes a weekend
  //   const weekendDays = [5, 6];
  //   const includesWeekend = [...Array(days).keys()]
  //     .map(i => new Date(checkin).setDate(new Date(checkin).getDate() + i))
  //     .some(date => weekendDays.includes(new Date(date).getDay()));
  
  //   if (includesWeekend) {
  //     pricePerNight = 150; // price per night on weekends
  //   }
  
  //   return days * pricePerNight;
  // }




  //////////////////////////////////////////////
  // import React, { useState } from 'react';

// function ReservationHost() {
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [numDays, setNumDays] = useState('');
//     const [numGuests, setNumGuests] = useState('');

//     const propId = 1; // replace with actual property ID

//     const createReservation = async () => {
//         const payload = {
//             check_in: checkIn,
//             check_out: checkOut,
//             num_days: numDays,
//             numGuests: numGuests
//         };

//         const response = await fetch(`http://localhost:8000/property/reservations/${propId}/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
//             body: JSON.stringify(payload)
//         });

//         if (response.ok) {
//             // success, do something here
//         } else {
//             // error, handle it here
//         }
//     };

//     return (
//         <div>
//             <label htmlFor="check-in">Check-in:</label>
//             <input type="date" id="check-in" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
//             <br />
//             <label htmlFor="check-out">Check-out:</label>
//             <input type="date" id="check-out" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
//             <br />
//             <label htmlFor="num-days">Number of Days:</label>
//             <input type="number" id="num-days" value={numDays} onChange={(e) => setNumDays(e.target.value)} />
//             <br />
//             <label htmlFor="num-guests">Number of Guests:</label>
//             <input type="number" id="num-guests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} />
//             <br />
//             <button onClick={createReservation}>Create Reservation</button>
//         </div>
//     );
// }